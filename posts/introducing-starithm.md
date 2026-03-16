---
title: "Introducing Starithm: Real-Time Multi-Messenger Astronomy, Automated"
date: "2026-03-01"
category: "Platform"
excerpt: "Astronomy is moving faster than any researcher can follow alone. Every day, dozens of alerts pour in from space-based observatories, gravitational wave detectors, and neutrino telescopes."
slug: "introducing-starithm"
read_time: "4 min read"
authors: "Starithm Team"
---

Astronomy is moving faster than any researcher can follow alone. Every day, dozens of alerts pour in from space-based observatories, gravitational wave detectors, and neutrino telescopes — gamma-ray bursts detected by Fermi, gravitational wave candidates from LIGO/Virgo, fast radio bursts, X-ray transients, neutrino triggers from IceCube. Each alert is a potential discovery. Most researchers catch them hours or days late, buried in email digests or missed entirely during nights away from the telescope.

Starithm was built to fix that.

## What Starithm Does

Starithm is a real-time astronomical event monitoring platform that ingests alerts from the GCN (General Coordinates Network) the moment they arrive, classifies them, clusters related notices into coherent events, and generates AI-powered summaries that synthesise everything known about an event — notices, GCN Circulars, positions, classifications — into a single readable briefing.

The platform currently monitors:

**Streaming notices** from Fermi GBM, Fermi LAT, Swift BAT, GECAM, LVC (gravitational waves), IceCube (neutrinos), and more — delivered over Kafka in real time.

**GCN Circulars** — the community's rapid-response reports, processed as they arrive via email and extracted into structured summaries using large language models.

**Multi-messenger correlation** — when a gamma-ray burst and a gravitational wave candidate overlap in time and sky position, Starithm flags it. When IceCube reports a neutrino and a GRB fired in the same direction hours earlier, that connection appears automatically.

## The AI Layer

Raw alerts are not enough. A Fermi GBM trigger notice contains a sky position and a timestamp. By the time ten more notices have arrived — position refinements, spectral fits, LAT detections, Swift follow-up — the picture is dramatically richer, but the data is scattered across a dozen messages in different formats.

Starithm's AI pipeline reads all of it. For each canonical event, it builds a structured summary: headline, significance level, what was detected and when, what instruments confirmed it, what the community reports say. For large events with many circulars, it routes to Claude (Anthropic) for deeper synthesis. For routine events, a smaller local model handles the load.

The result is a single-screen briefing that gives a researcher the full picture of any event in under a minute.

## Why We're Writing This Blog

Every event Starithm tracks is a real moment in the universe — a star collapsing, two neutron stars colliding, a black hole shredding a passing star. We're building this platform to make those moments accessible, not just to researchers with the right email subscriptions, but to anyone serious about following the transient sky.

This blog serves two purposes. First, we'll publish real event reports — posts written from Starithm's own monitoring data, describing exactly how major astronomical events unfolded as seen through our alert stream. These aren't summaries of other people's papers; they're first-hand accounts of what our system saw and when. Second, we'll write about the broader research landscape — new papers, methods, and discoveries in multi-messenger astronomy and transient science.

If you're a researcher who works with GCN data, follows multi-messenger events, or is building pipelines on top of unstructured astronomical alerts, Starithm is built for you. The platform is live. Event reports are published here as events happen.

## What's Coming

The roadmap includes multi-messenger correlation across event types, subscription alerts so you never miss a significant event, follow-up scheduling tools for observing campaigns, and a public API for programmatic access to event data.

We're at the early stages of something that we think changes how transient astronomy is followed. If you use Starithm in your research or reference our event reports, we'd ask you to cite us — each event post includes a BibTeX entry at the bottom. Every citation helps more researchers find the platform.

---

## Cite This Post

If you reference Starithm in your research, please cite:

```bibtex
@misc{starithm2026intro,
  title     = {Introducing Starithm: Real-Time Multi-Messenger Astronomy, Automated},
  author    = {{Starithm Platform}},
  year      = {2026},
  url       = {https://starithm.ai/blog/posts/introducing-starithm},
  note      = {Starithm platform introduction and methodology overview}
}
```
