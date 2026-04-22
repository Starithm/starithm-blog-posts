---
title: "Fast neural network surrogate for multimodal effective-one-body gravitational waveforms from generically precessing compact binaries"
date: "2026-04-22"
category: "Gravitational Waves"
excerpt: "Detecting gravitational waves from merging compact binaries requires comparing noisy detector data against thousands of theoretical waveform templates..."
arxiv_id: "2604.14270"
arxiv_url: "https://arxiv.org/abs/2604.14270v1"
authors: "Christopher Whittall, Geraint Pratten"
read_time: "3 min read"
slug: "fast-neural-network-surrogate-for-multimodal-effective-one-b-2604.14270"
---

## Opening

Detecting gravitational waves from merging compact binaries requires comparing noisy detector data against thousands of theoretical waveform templates—a computationally intensive process that must happen in near-real time. Whittall and Pratten have developed a machine learning surrogate model that accelerates this critical step by **~5 times on standard processors and ~1000 times when processing large batches on GPUs**, while maintaining the physical accuracy needed for reliable parameter estimation. Their new model, SEOBNRv5PHM_NNSur7dq10, extends neural network surrogate techniques to precessing binary black holes with arbitrary spin configurations, opening faster pathways for characterizing gravitational wave events.

## What they found

The authors built a reduced order neural network surrogate of the SEOBNRv5PHM waveform model, which describes generically precessing quasicircular binary black hole systems. The surrogate is *valid up to mass ratios of 1:10* and handles *arbitrary spin magnitudes and orientations*—a significant expansion of parameter space compared to earlier surrogate models.

![Neural network architecture for waveform generation](https://arxiv.org/html/2604.14270v1/Figures/neural_network_annotated.png)

The key technical innovation combines machine learning with the conventional reduced order surrogate framework. Rather than computing full waveforms from first principles each time, the neural network learns to predict outputs from the slower but more accurate SEOBNRv5PHM model. The authors validated their surrogate's faithfulness to the underlying model and demonstrated its application to Bayesian parameter inference using both real gravitational wave data and simulated injections.

The speed gains are substantial: **~5× acceleration on CPUs** for single waveform evaluations, and **~1000× speedup per waveform** when amortizing computational costs across large batches processed on GPUs. This performance improvement matters because gravitational wave parameter estimation often requires evaluating millions of waveforms to explore the posterior probability distribution of source properties.

## Why it matters

Gravitational wave astronomy depends on a delicate balance: templates must be physically accurate to extract reliable information about source masses, spins, and orbital dynamics, yet computationally efficient enough to process alerts within hours or days. Faster surrogates reduce the time between detection and parameter constraints, enabling rapid follow-up observations of electromagnetic counterparts and improving constraints on fundamental physics from binary mergers.

The extension to precessing binaries with generic spin configurations is particularly important. Spin effects leave distinctive imprints on waveforms, and accurately characterizing them requires models that handle the full complexity of orbital precession—something this surrogate now provides at accelerated speeds.

## What's next

The authors validate their surrogate against SEOBNRv5PHM but do not discuss extensions to other waveform models or higher mass ratios. The practical deployment of this surrogate in real-time gravitational wave searches, and its performance under the full range of detector noise conditions, remain open questions for future work.

Starithm continuously monitors real-time gravitational wave alerts, enabling researchers to track when new detections occur and apply tools like this surrogate for rapid characterization.