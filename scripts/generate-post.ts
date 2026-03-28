import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY not set');

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const REPO_ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(REPO_ROOT, 'posts');
const PROCESSED_FILE = path.join(REPO_ROOT, 'scripts', 'processed.json');

// arXiv categories and keyword filters
const ARXIV_QUERIES = [
  'cat:astro-ph.HE',
  'cat:gr-qc AND (gravitational+wave OR neutron+star OR black+hole+merger)',
];

const KEYWORD_FILTERS = [
  'grb', 'gamma-ray burst', 'gravitational wave', 'neutron star', 'black hole merger',
  'neutrino', 'multi-messenger', 'transient', 'fast radio burst', 'frb', 'kilonova',
  'x-ray transient', 'magnetar', 'supernova', 'tidal disruption',
];

const CATEGORY_MAP: Record<string, string> = {
  'gamma-ray burst': 'GRB',
  'grb': 'GRB',
  'gravitational wave': 'Gravitational Waves',
  'neutron star merger': 'Gravitational Waves',
  'kilonova': 'Gravitational Waves',
  'neutrino': 'Neutrinos',
  'fast radio burst': 'Fast Radio Bursts',
  'frb': 'Fast Radio Bursts',
  'magnetar': 'Magnetars',
  'supernova': 'Supernovae',
  'tidal disruption': 'Tidal Disruption Events',
  'x-ray transient': 'X-ray Transients',
  'multi-messenger': 'Multi-Messenger Astronomy',
};

interface ArxivPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  published: string;
  url: string;
}

function loadProcessed(): Set<string> {
  if (!fs.existsSync(PROCESSED_FILE)) return new Set();
  const data = JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8'));
  return new Set(data.processed || []);
}

function saveProcessed(processed: Set<string>) {
  fs.writeFileSync(PROCESSED_FILE, JSON.stringify({ processed: [...processed] }, null, 2));
}

function extractArxivId(url: string): string {
  return url.replace('http://arxiv.org/abs/', '').replace(/v\d+$/, '');
}

function slugify(title: string, arxivId: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
    .replace(/-+$/, '');
  return `${base}-${arxivId.replace('/', '-')}`;
}

function detectCategory(title: string, abstract: string): string {
  const text = (title + ' ' + abstract).toLowerCase();
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(keyword)) return category;
  }
  return 'Astronomy Research';
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(3, Math.round(words / 200));
  return `${minutes} min read`;
}

async function fetchArxivPapers(): Promise<ArxivPaper[]> {
  const papers: ArxivPaper[] = [];

  for (const query of ARXIV_QUERIES) {
    const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&start=0&max_results=30&sortBy=submittedDate&sortOrder=descending`;
    const res = await fetch(url);
    const xml = await res.text();

    // Parse entries from Atom XML
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];
    for (const entry of entries) {
      const id = (entry.match(/<id>(.*?)<\/id>/) || [])[1]?.trim() || '';
      const title = (entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim().replace(/\s+/g, ' ') || '';
      const abstract = (entry.match(/<summary>([\s\S]*?)<\/summary>/) || [])[1]?.trim().replace(/\s+/g, ' ') || '';
      const published = (entry.match(/<published>(.*?)<\/published>/) || [])[1]?.trim() || '';
      const authorMatches = [...entry.matchAll(/<name>(.*?)<\/name>/g)].map(m => m[1]);

      if (!id || !title || !abstract) continue;

      const text = (title + ' ' + abstract).toLowerCase();
      const isRelevant = KEYWORD_FILTERS.some(kw => text.includes(kw));
      if (!isRelevant) continue;

      papers.push({
        id: extractArxivId(id),
        title,
        abstract,
        authors: authorMatches,
        published,
        url: id.replace('http://', 'https://'),
      });
    }
  }

  return papers;
}

async function generateBlogPost(paper: ArxivPaper): Promise<string> {
  const category = detectCategory(paper.title, paper.abstract);
  const authorsShort = paper.authors.slice(0, 3).join(', ') + (paper.authors.length > 3 ? ' et al.' : '');

  const prompt = `You are a science communicator writing for Starithm, an astronomical event monitoring platform for researchers and astronomy enthusiasts.

Write an engaging blog post about the following research paper. The tone should be accessible but scientifically accurate — suitable for graduate students, researchers, and serious astronomy enthusiasts.

Paper title: ${paper.title}
Authors: ${authorsShort}
arXiv ID: ${paper.id}
Abstract: ${paper.abstract}

Write the blog post with:
1. An engaging opening paragraph that explains why this research matters
2. A "What they found" section explaining the key results in plain language
3. A "Why it matters" section connecting it to the broader field of multi-messenger astronomy or transient events
4. A "What's next" section about follow-up observations or open questions
5. A closing sentence mentioning that Starithm tracks real-time alerts related to events like this

Keep it 400-500 words total. Use markdown formatting with ## for section headers. Do not include a title (it will be added separately). Do not use bullet points for the main sections — write in paragraphs.`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });

  return (message.content[0] as any).text.trim();
}

async function main() {
  console.log('🔭 Fetching arXiv papers...');
  const papers = await fetchArxivPapers();
  console.log(`Found ${papers.length} relevant papers`);

  const processed = loadProcessed();
  const unprocessed = papers.filter(p => !processed.has(p.id));
  console.log(`${unprocessed.length} unprocessed papers remaining`);

  if (unprocessed.length === 0) {
    console.log('No new papers to process — done.');
    return;
  }

  const paper = unprocessed[0];
  console.log(`\n📄 Generating post for: ${paper.title}`);

  const content = await generateBlogPost(paper);
  const category = detectCategory(paper.title, paper.abstract);
  const slug = slugify(paper.title, paper.id);
  const date = new Date().toISOString().slice(0, 10);
  const authorsShort = paper.authors.slice(0, 3).join(', ') + (paper.authors.length > 3 ? ' et al.' : '');
  // Strip markdown headings and get first real paragraph for excerpt
  const contentWithoutHeadings = content.replace(/^#{1,6}\s+.+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  const excerptMatch = contentWithoutHeadings.match(/^(.{100,200}?[.!?])/);
  const excerpt = excerptMatch ? excerptMatch[1] : contentWithoutHeadings.slice(0, 150) + '...';
  const readTime = estimateReadTime(content);

  const frontmatter = `---
title: "${paper.title.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
arxiv_id: "${paper.id}"
arxiv_url: "${paper.url}"
authors: "${authorsShort}"
read_time: "${readTime}"
slug: "${slug}"
---

`;

  const fullContent = frontmatter + content;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, fullContent);
  console.log(`✅ Written: posts/${slug}.md`);

  // Mark as processed
  processed.add(paper.id);
  saveProcessed(processed);

  // Git commit and push
  const { execSync } = require('child_process');
  try {
    execSync(`git -C "${REPO_ROOT}" add posts/${slug}.md scripts/processed.json`);
    execSync(`git -C "${REPO_ROOT}" commit -m "post: ${paper.title.slice(0, 72)}"`);
    execSync(`git -C "${REPO_ROOT}" push origin main`);
    console.log('🚀 Pushed to GitHub');
  } catch (err) {
    console.error('Git push failed:', err);
  }
}

main().catch(console.error);
