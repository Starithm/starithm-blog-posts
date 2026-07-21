---
title: "Swift gives a new BAT-GLIMPSE: Gamma-ray Localization using Imaging and Mosaic techniques for Pointing and Slew Epochs"
date: "2026-07-21"
category: "GRB"
excerpt: "The Swift satellite has long been a workhorse for gamma-ray transient astronomy, but it has a critical blind spot: when the spacecraft slews to reposi..."
arxiv_id: "2607.15130"
arxiv_url: "https://arxiv.org/abs/2607.15130v1"
authors: "S. Ronchini, T. Parsotan, J. DeLaunay et al."
read_time: "3 min read"
slug: "swift-gives-a-new-bat-glimpse-gamma-ray-localization-using-i-2607.15130"
---

## Opening

The Swift satellite has long been a workhorse for gamma-ray transient astronomy, but it has a critical blind spot: when the spacecraft slews to reposition itself, its onboard trigger systems go silent, and any gamma-ray bursts occurring during these intervals escape autonomous detection. A new analysis pipeline called BAT-GLIMPSE addresses this gap, recovering arcminute-precision positions for transients that would otherwise be lost. The results suggest that combining this new tool with existing methods could *effectively double Swift's capability to localize gamma-ray events*, with particular implications for multi-messenger astronomy during gravitational wave alerts.

## What they found

BAT-GLIMPSE is a fully autonomous, open-source pipeline designed to localize gamma-ray transients in data from Swift's Burst Alert Telescope (BAT) during both normal pointing observations and spacecraft slews. The pipeline leverages two complementary techniques—coded-mask imaging and mosaic analysis—and automatically selects the appropriate method based on spacecraft attitude.

The authors validated BAT-GLIMPSE on **66 gamma-ray bursts** reported in GUANO circulars. The pipeline successfully recovered arcminute positions for **43 events**, with typical localization offsets of **≲5 arcminutes**, consistent with published positions. Notably, approximately **88% of GRBs occurring during spacecraft slews** were recovered through imaging or mosaic analyses—events that would otherwise have gone unlocalized by Swift's standard onboard systems.

![Comparison of BAT-GLIMPSE imaging localization with Fermi-GBM positions, showing recovered arcminute-scale positions during pointing observations](https://arxiv.org/html/2607.15130v1/map_imaging.png)

The pipeline's performance during gravitational wave observing runs proved particularly valuable. During the fourth LIGO-Virgo-KAGRA observing run, BAT-GLIMPSE played a crucial role in searching for gamma-ray counterparts to gravitational wave events. Pre-merger alerts triggered Swift slews with extremely low latency, and BAT-GLIMPSE enabled localization searches during these critical intervals when the spacecraft was repositioning.

Operating in synergy with NITRATES (an existing pipeline for pointed observations), BAT-GLIMPSE fills the temporal gap left by slew intervals. The authors estimate that *together, the two pipelines are capable of doubling the onboard arcminute-localization rate of Swift-BAT*—a substantial improvement over current capabilities.

## Why it matters

Multi-messenger astronomy increasingly relies on rapid, precise localization of transient events. Gravitational wave detections, in particular, benefit enormously from electromagnetic counterpart searches, and Swift remains one of the fastest responders. By enabling localization during slew intervals, BAT-GLIMPSE removes a systematic inefficiency that previously caused Swift to miss transients occurring at inopportune times. This is especially important for pre-merger alerts, where low-latency spacecraft repositioning is essential but previously came at the cost of detection capability.

## What's next

The authors have released BAT-GLIMPSE as open-source software, enabling broader adoption and community validation. Future work likely involves continued refinement of the mosaic analysis techniques and integration with real-time alert systems.

Starithm monitors real-time gamma-ray alerts and multi-messenger events, enabling researchers to track Swift observations and related transient detections as they occur.