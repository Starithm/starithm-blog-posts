---
title: "Toward Autonomous Radio Follow-up of Multi-messenger Transients with RADAR: From Alert Parsing to Inference and Observation Scheduling"
date: "2026-09-21"
category: "Gravitational Waves"
excerpt: "When a gravitational wave detector picks up the signature of a cosmic collision, the clock starts ticking."
arxiv_id: "2609.18233"
arxiv_url: "https://arxiv.org/abs/2609.18233v1"
authors: "Mihael Hategan-Marandiuc, Tanner O'Dwyer, Alessandra Corsi et al."
read_time: "3 min read"
slug: "toward-autonomous-radio-follow-up-of-multi-messenger-transie-2609.18233"
---

## Opening

When a gravitational wave detector picks up the signature of a cosmic collision, the clock starts ticking. Astronomers around the world have only hours—sometimes minutes—to point their telescopes at the right patch of sky before the afterglow fades. This is where automation becomes essential. A new study presents RADAR, a framework designed to streamline the entire chain from alert to observation for radio follow-up of gravitational wave events, demonstrating meaningful improvements in speed and accuracy that could reshape how the multi-messenger astronomy community responds to transient events.

## What they found

The RADAR collaboration extended their previous work along three complementary fronts. First, they benchmarked three large language models (LLMs) against radio observations of GW170817, the landmark neutron star merger detected in 2017. **GPT-5.5 achieved the highest event-level F₁ score at 0.893 ± 0.010** and **the highest GCN-level recall at 0.794 ± 0.013**—improvements of **16% and 10%**, respectively, over earlier GPT-4.1 results. Meanwhile, **Claude-Opus-4.7 attained the highest precision at 0.978 ± 0.014**, suggesting that different models excel at different aspects of alert classification. These metrics matter because they directly affect whether astronomers receive accurate, actionable information about candidate events.

Second, the team introduced concurrent likelihood evaluation to accelerate their Markov Chain Monte Carlo (MCMC) computations, achieving a **40× speedup** over previous results. This computational gain is critical for time-sensitive observations, where delays in parameter estimation can mean missing the transient entirely.

Third, and perhaps most operationally significant, the authors developed an LLM-driven system that translates natural-language observing requests into submission-ready scheduling blocks for the Karl G. Jansky Very Large Array (VLA). This bridges the gap between human astronomers and telescope scheduling systems, reducing manual intervention and human error in the critical minutes following an alert.

## Why it matters

Multi-messenger astronomy promises a richer understanding of cosmic sources by combining gravitational waves, electromagnetic radiation, neutrinos, and cosmic rays. Yet realizing this promise requires coordinating diverse observing facilities across the globe in near-real time. RADAR's advances—particularly the LLM-driven scheduling and accelerated parameter inference—address genuine bottlenecks in this workflow. By automating alert parsing, inference, and observation scheduling, the framework moves the field closer to a system that can respond to transient events with minimal human overhead, freeing astronomers to focus on interpretation rather than logistics.

## What's next

The authors validated their approach on GW170817, a well-studied event with extensive archival data. Future work will likely test RADAR on newly detected gravitational wave events and explore how the framework scales across multiple radio facilities. Open questions remain about how LLM performance generalizes to events with different physical properties and how the system handles ambiguous or conflicting alerts.

Starithm continuously monitors real-time gravitational wave and multi-messenger alerts, making it an ideal platform to track follow-up campaigns like those enabled by RADAR.