---
title: "SPINE: teaching a machine to read the tracks of ghost particles"
date: "2026-10-28"
category: "Neutrinos"
excerpt: "A neutrino detector does not see a neutrino. It sees a tangle of tracks left by the particles a neutrino knocked loose, mixed with cosmic rays and other noise. SLAC's SPINE software reads that tangle in stages and shows its work, and in ICARUS's first physics result it recovered roughly 60% more usable neutrino interactions than the conventional chain."
read_time: "8 min read"
slug: "spine-reading-the-tracks-of-ghost-particles"
---

# SPINE: teaching a machine to read the tracks of ghost particles

On October 27, 2026, SLAC National Accelerator Laboratory described SPINE, a machine-learning program that reconstructs neutrino interactions from detector images. SPINE stands for Scalable Particle Imaging with Neural Embeddings. SLAC says it now runs on eight detectors across about 25 institutions. It helped produce the first physics result from ICARUS at Fermilab, and the team has already trained versions for the Deep Underground Neutrino Experiment (DUNE).

This is not a story about a new telescope or a new source in the sky. It is about a quieter problem that sits under all of neutrino physics: once a detector has caught something, how do you work out what actually happened?

## You never see the neutrino

Neutrinos have no electric charge and almost no mass, and they barely interact with anything. Trillions pass through your body every second without leaving a trace. To catch a few, experiments use enormous targets and intense beams, and then wait for the rare collision.

Many of the newest detectors are liquid argon time-projection chambers. They hold hundreds to thousands of tons of ultra-pure liquid argon, kept at about minus 186 °C. When a neutrino strikes an argon nucleus, it can produce several charged particles: muons, protons, pions, electrons. Each one ionises the argon along its path. The freed electrons drift through an electric field to planes of sensing wires, and the timing and position of their arrival let the detector rebuild the tracks in three dimensions.

So the raw data is a picture, and a very detailed one. That is the strength of the technology. It is also the problem. The neutrino itself is invisible; the picture shows only what it left behind. And one picture can contain several overlapping interactions, plus cosmic-ray muons raining through from above, plus electronic noise.

Somebody has to read the picture. That job is called reconstruction, and it decides what an experiment can measure at all. François Drielsma, SPINE's lead developer, put it bluntly in SLAC's article: a working reconstruction "separates a failing experiment from one that is actually able to make measurements."

## From a chain of tools to a hierarchy

The traditional approach is a chain of specialised algorithms, each written by hand for one narrow task: find the hits, find the straight segments, join the segments into tracks, guess which track belongs to which particle, and so on. It works, but the steps are brittle. A mistake early in the chain gets passed along, and every later step inherits it.

SPINE replaces that chain with several machine-learning models that work together in stages:

1. **Features.** First it labels the basic content of the image, point by point: is this part of a track, a shower, a stray low-energy blip?
2. **Particles.** Then it groups those points into individual particles and identifies what each one is.
3. **Interactions.** Finally it assembles the particles into whole interactions, and works out which ones came from the same neutrino.

## Inside the chain

The design was first laid out in a 2020 paper by Drielsma, Terao, Laura Dominé and Dae Heun Koh, presented at the NeurIPS workshop on Machine Learning and the Physical Sciences ([arXiv:2102.01033](https://arxiv.org/abs/2102.01033)). The name SPINE came later, but the structure is the same: a cascade of networks, each one building on the output of the last.

**Pixel by pixel.** The 3D image is cut into tiny cubes called voxels. A network called a sparse U-ResNet gives every lit voxel one of five labels: part of an electromagnetic shower, part of a track, a Michel electron (the electron released when a muon decays), a delta ray (an electron knocked off sideways by a passing particle), or a small low-energy deposit. In the paper's tests it labelled about 99.5 percent of track voxels and 97.7 percent of shower voxels correctly. The biggest source of confusion was delta rays, which overlap the tracks they come from.

Running alongside it, a point proposal network marks the important points: where tracks start and end, where showers begin. It placed 68 percent of its points within a tenth of a millimetre of the true position.

**Grouping into pieces.** A second network then learns a new set of coordinates in which voxels from the same particle sit close together, plus a score for how near each voxel is to its group's centre. That turns "which voxels belong together?" into a much easier problem. Across all particle types it averaged 97.5 percent efficiency and purity: it found almost all of each particle's voxels, and added very few from other particles.

**Assembling particles and interactions.** Showers are awkward, because they break into gaps and fragments that are not touching. So the last stages are graph neural networks. Each fragment becomes a node, every pair of nodes is joined by an edge, and the network passes messages along the edges until it can decide which edges are real. The first graph network assembles shower fragments into whole showers and picks out the fragment where each shower began. The second groups particles into interactions and identifies each particle's type.

The interaction stage is the one aimed at DUNE. At the particle density expected in DUNE's near detector, with up to ten interactions overlapping in one image in the tests, it grouped particles into the right interaction with about 99.1 percent purity and efficiency.

Two practical points stand out. Because the networks are sparse, their cost depends on how many voxels are lit, not on the size of the detector, and more than 99 percent of a liquid argon image is empty. And the whole chain can be retrained in under a week on a single GPU, where the paper notes that tuning a traditional chain by hand can take months to years per data production campaign.

All of these figures come from simulated events in an open dataset, PILArNet: 125,280 training images and 22,439 test images, each a 768-voxel cube covering 12 cubic metres of argon. Simulation is where the true answer is known, so it is where you can measure accuracy. It is not the same as real data, which is why the ICARUS result below matters.

## Showing its work

The design choice that matters most is the hierarchy. As Drielsma explained, the team did not try to jump from raw detector data straight to the final physics numbers in one step. Each stage produces a result a physicist can inspect: here are the particles, here is how they were grouped, here is the interaction they were assigned to. SLAC describes this as the software showing its work. Kazuhiro Terao, who started applying computer-vision methods to neutrino images as a SLAC postdoc in 2015 and 2016, described the aim as recording the evidence first and drawing the conclusion from it.

That is a meaningful difference from a black box. If a network simply announced "this was a muon neutrino with this energy", nobody could check the reasoning. A chain of inspectable intermediate results can be checked, argued with, and corrected, which is how physics results have to survive review. The 2020 paper makes the same argument: a series of task-specific networks lets you find where the algorithm falls short, and reduces how much the result depends on the training set.

## The first test on real data: ICARUS

ICARUS is the largest detector in Fermilab's Short-Baseline Neutrino program: 760 tons of liquid argon, about 600 metres from the target that makes the Booster Neutrino Beam. In March 2026 the ICARUS collaboration posted its first oscillation analysis ([arXiv:2603.22557](https://arxiv.org/abs/2603.22557)), and SPINE was part of it.

The question was about sterile neutrinos. There are three known neutrino flavours: electron, muon and tau. Some earlier experiments saw anomalies that could be explained by a fourth kind that does not interact through the weak force at all. If it exists, some muon neutrinos in the beam should change into it on the way to the detector and disappear from the count.

ICARUS looked for that shortfall, using events with one muon and at least one proton, from data taken in 2022 and 2023. It found no statistically significant disappearance, and set limits on where a sterile neutrino could still hide.

A null result is still a result. What makes this one notable for SPINE is the comparison SLAC reports: against the conventional reconstruction, SPINE recovered roughly 60% more usable neutrino interactions, with a cleaner sample, better energy resolution and smaller systematic uncertainties. It was the first physics analysis to use SPINE, and the first sign it holds up on real data rather than only on simulations. Drielsma admitted that until a year ago the team only hoped the approach would work.

The paper itself notes the analysis is still limited by systematic uncertainties, mostly in the beam flux and in how neutrinos interact with argon. The next step is a joint analysis with SBND, a second detector only 110 metres from the target. Comparing what the beam looks like at two distances cancels much of that uncertainty. SLAC expects those results in 2026 and 2027.

## The harder test: DUNE

DUNE will send a neutrino beam from Fermilab in Illinois about 800 miles through the Earth to detectors deep underground in South Dakota. It is under construction and expected to start taking data in 2030. Its goals include measuring how neutrinos change flavour over that distance, settling which neutrino is heaviest, and looking for differences between neutrinos and antineutrinos that might help explain why the universe is made of matter at all.

The near detector, close to the beam source, is the reconstruction nightmare. It will see a pile-up of interactions overlapping in the same image. Drielsma's figure is about 1,000 interactions piling up every 10 seconds. SLAC's team has trained SPINE models for both the near and far detectors, and SLAC describes SPINE as currently the only reconstruction approach able to handle the near detector's complexity. That is a strong claim, made by the lab that built the tool, and the real test will come when DUNE's data does.

## Why this matters beyond accelerators

Most of what Starithm follows is astrophysical: neutrino alerts from IceCube, gamma-ray bursts, gravitational waves. SPINE is built for beam experiments, so at first glance it sits in a different field.

The connection is DUNE's far detector. One of its science goals is catching the burst of neutrinos from a core-collapse supernova in our galaxy, which would arrive hours before the light. Liquid argon is especially good at recording the electron neutrinos from the first moments of the collapse. When that happens, the speed and reliability of reconstruction will decide how quickly a detector can say "this is real" and tell the rest of the world where to look. Being able to read a messy argon image correctly is part of what makes a neutrino detector an alert system and not just an archive.

More broadly, SPINE is a good example of where machine learning helps in physics. It does not replace the scientific argument. It speeds up the slow, error-prone step of turning a picture into a list of particles, and it leaves every intermediate step open to inspection.

---

*Sources: SLAC National Accelerator Laboratory, "SLAC's SPINE" news release, October 27, 2026; ICARUS Collaboration, "First search for sterile neutrino oscillation leading to ν<sub>μ</sub> disappearance in the Booster Neutrino Beam at ICARUS", [arXiv:2603.22557](https://arxiv.org/abs/2603.22557); F. Drielsma, K. Terao, L. Dominé and D. H. Koh, "Scalable, End-to-End, Deep-Learning-Based Data Reconstruction Chain for Particle Imaging Detectors", NeurIPS 2020 Machine Learning and the Physical Sciences workshop, [arXiv:2102.01033](https://arxiv.org/abs/2102.01033); DUNE collaboration science goals.*
