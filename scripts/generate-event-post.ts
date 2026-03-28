import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Client } from 'pg';

// Load env from NovaTrace
const ENV_FILE = '/Users/kusha/Documents/Starithm/NovaTrace/.env';
dotenv.config({ path: ENV_FILE });

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY not set');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL not set');

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const REPO_ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(REPO_ROOT, 'posts');
const PROCESSED_FILE = path.join(REPO_ROOT, 'scripts', 'processed-events.json');
const SITE_BASE = 'https://starithm.ai';

// Minimum activity to be worth a blog post
const MIN_NOTICES = 3;
const MIN_CIRCULARS = 2;

// How much growth triggers an update post
const UPDATE_CIRCULAR_THRESHOLD = 3;
const UPDATE_NOTICE_THRESHOLD = 2;

// ── Types ────────────────────────────────────────────────────────────────────

interface ProcessedEntry {
  slug: string;
  noticeCount: number;
  circularCount: number;
  lastUpdated: string; // ISO date
}

interface ProcessedStore {
  events: Record<string, ProcessedEntry>;
}

interface EventRow {
  canonical_id: string;
  headline: string;
  significance: string;
  details: string;
  generated_at: Date;
  notice_count: number;
  circular_count: number;
}

interface NoticeRow {
  id: string;
  alert_kind: string;
  topic: string;
  source_name: string | null;
  phase: string | null;
  t0: Date | null;
  ra_deg: number | null;
  dec_deg: number | null;
  classification: Record<string, number> | null;
}

interface CircularRow {
  event: string;
  summary: string;
  date: string;
}

// ── Processed store ──────────────────────────────────────────────────────────

function loadStore(): ProcessedStore {
  if (!fs.existsSync(PROCESSED_FILE)) return { events: {} };
  try {
    return JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8'));
  } catch {
    return { events: {} };
  }
}

function saveStore(store: ProcessedStore) {
  fs.writeFileSync(PROCESSED_FILE, JSON.stringify(store, null, 2));
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(canonicalId: string): string {
  return canonicalId
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(3, Math.round(words / 200))} min read`;
}

function detectCategory(alertKind: string): string {
  const map: Record<string, string> = {
    grb: 'GRB', gw: 'Gravitational Waves', neutrino: 'Neutrinos',
    frb: 'Fast Radio Bursts', xray: 'X-ray Transients',
    optical: 'Optical Transients', radio: 'Radio Transients',
  };
  return map[alertKind] || 'Astronomical Transients';
}

function formatClassification(cls: Record<string, number> | null): string {
  if (!cls) return '';
  return Object.entries(cls)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k, v]) => `${k}: ${(v * 100).toFixed(0)}%`)
    .join(', ');
}

function buildCiteBlock(
  canonicalId: string,
  slug: string,
  title: string,
  dateStr: string,
): string {
  const year = dateStr.slice(0, 4);
  const key = `starithm${year}${canonicalId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  return `---

## Live Event Page

Track this event in real time on Starithm: [${canonicalId} — Live Event Page](${SITE_BASE}/novatrace/events/${canonicalId})

---

## Cite This Post

If you reference this event report in your research, please cite:

\`\`\`bibtex
@misc{${key},
  title     = {${title}},
  author    = {{Starithm Platform}},
  year      = {${year}},
  url       = {${SITE_BASE}/blog/posts/${slug}},
  note      = {Real-time astronomical event monitoring report, Starithm}
}
\`\`\`
`;
}

function stripCiteBlock(content: string): string {
  // Remove everything from the cite block separator onward
  const idx = content.indexOf('\n---\n\n## Cite This Post');
  return idx === -1 ? content : content.slice(0, idx);
}

// ── DB queries ───────────────────────────────────────────────────────────────

async function fetchTopEvents(pg: Client): Promise<EventRow[]> {
  const res = await pg.query<EventRow>(`
    SELECT
      canonical_id,
      headline,
      significance,
      details,
      generated_at,
      jsonb_array_length(COALESCE(source_ids->'noticeIds', '[]'::jsonb)) AS notice_count,
      jsonb_array_length(COALESCE(source_ids->'circularIds', '[]'::jsonb)) AS circular_count
    FROM event_summaries
    WHERE
      jsonb_array_length(COALESCE(source_ids->'noticeIds', '[]'::jsonb)) >= $1
      OR jsonb_array_length(COALESCE(source_ids->'circularIds', '[]'::jsonb)) >= $2
    ORDER BY (
      jsonb_array_length(COALESCE(source_ids->'noticeIds', '[]'::jsonb)) +
      jsonb_array_length(COALESCE(source_ids->'circularIds', '[]'::jsonb))
    ) DESC
    LIMIT 50
  `, [MIN_NOTICES, MIN_CIRCULARS]);
  return res.rows;
}

async function fetchNotices(pg: Client, canonicalId: string): Promise<NoticeRow[]> {
  const res = await pg.query<NoticeRow>(`
    SELECT id::text, alert_kind, topic, source_name, phase,
           t0, ra_deg, dec_deg, classification
    FROM streaming_alerts
    WHERE canonical_id = $1
    ORDER BY t0 ASC NULLS LAST
  `, [canonicalId]);
  return res.rows;
}

async function fetchCirculars(pg: Client, canonicalId: string): Promise<CircularRow[]> {
  // Get the alert keys from event_summaries.source_ids->'circularIds'
  const keysRes = await pg.query<{ alert_key: string }>(`
    SELECT jsonb_array_elements_text(source_ids->'circularIds') AS alert_key
    FROM event_summaries
    WHERE canonical_id = $1
  `, [canonicalId]);

  if (keysRes.rows.length === 0) return [];

  const alertKeys = keysRes.rows.map(r => r.alert_key);
  const res = await pg.query<CircularRow>(`
    SELECT event, summary, date::text
    FROM alerts
    WHERE alert_key = ANY($1)
    ORDER BY date ASC
  `, [alertKeys]);
  return res.rows;
}

// ── AI generation ────────────────────────────────────────────────────────────

function buildNoticesSummary(notices: NoticeRow[]): string {
  return notices.slice(0, 15).map((n, i) => {
    const phase = n.phase ? ` [${n.phase}]` : '';
    const pos = n.ra_deg != null ? ` RA=${n.ra_deg.toFixed(2)}° Dec=${n.dec_deg?.toFixed(2)}°` : '';
    const cls = n.classification ? ` (${formatClassification(n.classification)})` : '';
    const time = n.t0 ? new Date(n.t0).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '';
    return `Notice ${i + 1}${phase}: ${n.topic}${pos}${cls}${time ? ' at ' + time : ''}`;
  }).join('\n');
}

function buildCircularsSummary(circulars: CircularRow[], skip = 0): string {
  return circulars.slice(skip, skip + 10).map((c, i) =>
    `Circular ${skip + i + 1} (${c.date?.slice(0, 10)}): ${c.summary.slice(0, 300)}`
  ).join('\n\n');
}

async function generateFullPost(event: EventRow, notices: NoticeRow[], circulars: CircularRow[]): Promise<string> {
  const category = detectCategory(notices[0]?.alert_kind || '');

  const prompt = `You are a science communicator writing for Starithm, a real-time astronomical event monitoring platform.

Write a blog post about a real astronomical event Starithm tracked live. This is first-hand monitoring data — not a summary of someone else's paper.

Event: ${event.canonical_id}
Type: ${category}
Significance: ${event.significance}
Starithm AI Headline: ${event.headline}
Starithm AI Summary: ${event.details}

Alert timeline (${notices.length} notices total):
${buildNoticesSummary(notices)}

Community circulars (${circulars.length} total, excerpts):
${buildCircularsSummary(circulars) || 'No circulars retrieved.'}

Write an engaging blog post covering:
1. Opening paragraph — why this event caught attention, mention Starithm tracked it in real time
2. ## Alert Timeline — how the event unfolded notice by notice (use timing and instrument data)
3. ## What the Community Found — key findings from the circulars
4. ## Starithm's Read — our AI-generated synthesis of the event
5. ## Why This Matters — broader scientific significance
6. Closing sentence about following real-time events on Starithm

450-550 words. Markdown ## headers. Paragraphs not bullet lists. No title line at the top.`;

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1200,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  return (msg.content[0] as any).text.trim();
}

async function generateUpdateSection(
  event: EventRow,
  newCirculars: CircularRow[],
  prevCircularCount: number,
  today: string,
): Promise<string> {
  const prompt = `You are a science communicator for Starithm, updating a blog post about astronomical event ${event.canonical_id}.

New circulars have arrived since the original post. Write a concise update section (2-3 paragraphs, ~150 words) covering what these new reports add to our understanding.

New circulars (${newCirculars.length}):
${buildCircularsSummary(newCirculars, 0)}

Write only the update paragraphs — no heading, no intro like "Update:". Just the content. Be specific about what's new.`;

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  const body = (msg.content[0] as any).text.trim();
  return `\n\n## Update — ${today}\n\n${body}`;
}

// ── File operations ──────────────────────────────────────────────────────────

function buildFrontmatter(params: {
  title: string; date: string; category: string; excerpt: string;
  eventId: string; significance: string; noticeCount: number;
  circularCount: number; readTime: string; slug: string;
}): string {
  return `---
title: "${params.title.replace(/"/g, '\\"')}"
date: "${params.date}"
category: "${params.category}"
excerpt: "${params.excerpt.replace(/"/g, '\\"')}"
event_id: "${params.eventId}"
significance: "${params.significance}"
notice_count: ${params.noticeCount}
circular_count: ${params.circularCount}
read_time: "${params.readTime}"
slug: "${params.slug}"
---

`;
}

function updateFrontmatterCounts(raw: string, noticeCount: number, circularCount: number): string {
  return raw
    .replace(/^notice_count: \d+$/m, `notice_count: ${noticeCount}`)
    .replace(/^circular_count: \d+$/m, `circular_count: ${circularCount}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const pg = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await pg.connect();

  try {
    console.log('🔭 Querying high-activity events...');
    const events = await fetchTopEvents(pg);
    console.log(`Found ${events.length} eligible events`);

    const store = loadStore();
    const today = new Date().toISOString().slice(0, 10);

    // Separate: new events vs events needing updates
    const newEvents = events.filter(e => !store.events[e.canonical_id]);
    const updateCandidates = events.filter(e => {
      const entry = store.events[e.canonical_id];
      if (!entry) return false;
      const moreCirculars = Number(e.circular_count) - Number(entry.circularCount) >= UPDATE_CIRCULAR_THRESHOLD;
      const moreNotices = Number(e.notice_count) - Number(entry.noticeCount) >= UPDATE_NOTICE_THRESHOLD;
      return moreCirculars || moreNotices;
    });

    console.log(`  ${newEvents.length} new, ${updateCandidates.length} needing updates`);

    const { execSync } = require('child_process');
    let committed = false;

    // ── Process one new event ────────────────────────────────────────────────
    if (newEvents.length > 0) {
      const event = newEvents[0];
      console.log(`\n📡 New post: ${event.canonical_id} (${event.notice_count} notices, ${event.circular_count} circulars)`);

      const [notices, circulars] = await Promise.all([
        fetchNotices(pg, event.canonical_id),
        fetchCirculars(pg, event.canonical_id),
      ]);
      console.log(`  Fetched ${notices.length} notices, ${circulars.length} circulars`);

      const body = await generateFullPost(event, notices, circulars);
      const slug = `event-${slugify(event.canonical_id)}`;
      const date = today;
      const category = detectCategory(notices[0]?.alert_kind || '');
      const significance = event.significance.charAt(0).toUpperCase() + event.significance.slice(1);

      const noHeadings = body.replace(/^#{1,6}\s+.+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
      const excerptMatch = noHeadings.match(/^(.{100,250}?[.!?])/);
      const excerpt = excerptMatch ? excerptMatch[1] : noHeadings.slice(0, 200) + '...';

      const citeBlock = buildCiteBlock(event.canonical_id, slug, event.headline, date);
      const frontmatter = buildFrontmatter({
        title: event.headline, date, category, excerpt,
        eventId: event.canonical_id, significance,
        noticeCount: event.notice_count, circularCount: event.circular_count,
        readTime: estimateReadTime(body), slug,
      });

      const fullContent = frontmatter + body + '\n\n' + citeBlock;
      fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fullContent);
      console.log(`✅ Written: posts/${slug}.md`);

      store.events[event.canonical_id] = {
        slug,
        noticeCount: Number(event.notice_count),
        circularCount: Number(event.circular_count),
        lastUpdated: today,
      };

      execSync(`git -C "${REPO_ROOT}" add posts/${slug}.md`);
      committed = true;
    }

    // ── Process one update ───────────────────────────────────────────────────
    if (updateCandidates.length > 0) {
      const event = updateCandidates[0];
      const entry = store.events[event.canonical_id];
      console.log(`\n🔄 Updating: ${event.canonical_id} (was ${entry.circularCount} circulars, now ${event.circular_count})`);

      const circulars = await fetchCirculars(pg, event.canonical_id);
      const newCirculars = circulars.slice(entry.circularCount);

      if (newCirculars.length > 0) {
        const updateSection = await generateUpdateSection(event, newCirculars, entry.circularCount, today);
        const filePath = path.join(POSTS_DIR, `${entry.slug}.md`);
        let raw = fs.readFileSync(filePath, 'utf-8');

        // Update counts in frontmatter
        raw = updateFrontmatterCounts(raw, event.notice_count, event.circular_count);

        // Strip old cite block, append update, re-add cite block
        const bodyOnly = stripCiteBlock(raw);
        const citeBlock = buildCiteBlock(
          event.canonical_id, entry.slug,
          event.headline, entry.lastUpdated,
        );
        fs.writeFileSync(filePath, bodyOnly + updateSection + '\n\n' + citeBlock);
        console.log(`✅ Updated: posts/${entry.slug}.md (+${newCirculars.length} circulars)`);

        store.events[event.canonical_id] = {
          ...entry,
          noticeCount: Number(event.notice_count),
          circularCount: Number(event.circular_count),
          lastUpdated: today,
        };

        execSync(`git -C "${REPO_ROOT}" add posts/${entry.slug}.md`);
        committed = true;
      }
    }

    if (!committed) {
      console.log('Nothing to commit — done.');
      return;
    }

    saveStore(store);
    execSync(`git -C "${REPO_ROOT}" add scripts/processed-events.json`);

    const summary = [
      newEvents.length > 0 ? `new: ${newEvents[0].canonical_id}` : '',
      updateCandidates.length > 0 ? `update: ${updateCandidates[0].canonical_id}` : '',
    ].filter(Boolean).join(', ');

    execSync(`git -C "${REPO_ROOT}" commit -m "event posts: ${summary}"`);
    execSync(`git -C "${REPO_ROOT}" push origin main`);
    console.log('🚀 Pushed to GitHub');

  } finally {
    await pg.end();
  }
}

main().catch(console.error);
