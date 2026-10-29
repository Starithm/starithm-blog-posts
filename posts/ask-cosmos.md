---
title: "Ask Cosmos: ask the GCN record a question, get an answer cited to the circulars"
date: "2026-10-29"
category: "Platform"
excerpt: "Ask Cosmos answers questions about gamma-ray bursts, gravitational-wave candidates, neutrino alerts and X-ray transients directly from GCN Circulars (1997 to today), recent ATels and GCN notices. Every sentence in the answer links to the circular it came from."
slug: "ask-cosmos"
read_time: "5 min read"
authors: "Starithm Team"
---

# Ask Cosmos: ask the GCN record a question, get an answer cited to the circulars

Since 1997 the GCN Circulars have been where the transient community reports what it saw: the first localisation of a gamma-ray burst, the redshift from a spectrograph that night, the upper limit from a telescope that found nothing, and the retraction when a gravitational-wave candidate turns out to be a glitch. There are about 44,600 of them. They are public and searchable by event name, but answering an actual question, such as "what redshift did X-shooter measure for GRB 221009A?", still means opening circulars one by one and reading.

Ask Cosmos is a search page on Starithm that does that reading for you. You type a question in plain English, and it answers from the circulars, with every sentence linked to the circular it came from.

**Try it:** [starithm.ai/novatrace/search](https://starithm.ai/novatrace/search)

## What it covers

- **GCN Circulars from 1997 to today**, about 44,600 of them, including the full archive before Starithm started ingesting live.
- **The Astronomer's Telegram (ATel)**, from October 2026 onwards.
- **GCN notices** for events Starithm has tracked live: the machine-readable alerts from Fermi, Swift, LIGO/Virgo/KAGRA, IceCube, Einstein Probe and others. When you ask about such an event, its notices are summarised as one more source, so the answer can describe how the position or classification changed over time.

## Examples

Each link runs the question live.

- [What redshift did X-shooter measure for GRB 221009A?](https://starithm.ai/novatrace/search?q=What+redshift+did+X-shooter+measure+for+GRB+221009A%3F) The answer is z = 0.151, from the VLT/X-shooter circular, and it notes that the GTC spectrum gave a consistent value.
- [Was S190822c a real gravitational-wave event?](https://starithm.ai/novatrace/search?q=Was+S190822c+a+real+gravitational-wave+event%3F) No. The answer cites the circular in which LIGO/Virgo withdrew the candidate after finding a data-quality problem at the Livingston detector.
- [A binary neutron star merger in 2017](https://starithm.ai/novatrace/search?q=a+binary+neutron+star+merger+in+2017) The answer identifies GW170817 from the 2017 circulars: the LIGO/Virgo identification, the Fermi GBM burst about two seconds later, and the first distance and sky-area estimates.
- [How did the sky position of S250818k change?](https://starithm.ai/novatrace/search?q=How+did+the+sky+position+of+S250818k+change%3F) The answer combines the event's GCN notices with the skymap areas reported in circulars.

## How an answer is built

1. **Find the circulars.** Your question is matched against every circular by meaning, using text embeddings, and by exact names: event names such as GRB 221009A or S250818k, and catalogue designations such as MAXI J1609-487 or SGR 1935+2154.
2. **Pick what to read.** For a question about one event, it reads the event's earliest and latest circulars and those most relevant to your question. For a broader question, it reads the most relevant circulars across all events.
3. **Write the answer.** A language model (Anthropic's Claude Haiku) writes the summary using only those circulars, citing each claim.
4. **Check the citations.** Any sentence that does not cite a circular is removed before you see it. A sentence saying something was *not* reported is allowed, so "no circular reports a redshift for this burst" is a valid answer.

Next to the answer you see the sources (open any circular in place), the events involved, and, for event questions, a fact sheet with the event's position, time and instruments.

If a question is outside the circulars' domain, Ask Cosmos says so instead of guessing.

## What it is not

The summary is **written by an AI model**, and the page says so above every answer. Every claim links to its circular, so you can check it, and you should before relying on it. Known limitations today:

- **Later corrections can be missed.** When a circular is later corrected or retracted, the answer may not include the correction if that circular was not among those read. We are working on always including retractions and verdicts for the event asked about.
- **Older circulars are not yet linked to events.** Circulars from the archive are searchable, but not all of them are connected to an event page yet, so an answer about a 2017 event may show no "events involved".
- **ATel coverage starts in October 2026.**

## Access

Your first question needs no account. After that, sign in (free) to keep asking, up to 20 questions a day. Questions and answers are logged so we can see where search fails and fix it; the thumbs up and down under each answer go straight into that log.

## For researchers

If you work on transients and Ask Cosmos gets something wrong, or misses a circular you know exists, we want to hear about it: press the thumbs-down under the answer, and we will look at it. It is early, and the questions people actually ask are what will make it better.
