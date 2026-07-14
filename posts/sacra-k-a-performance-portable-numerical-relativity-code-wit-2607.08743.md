---
title: "SACRA-K: A Performance-Portable Numerical Relativity Code with Kokkos"
date: "2026-07-14"
category: "Gravitational Waves"
excerpt: "Numerical relativity simulations are essential for interpreting gravitational-wave observations from compact object mergers, but they demand enormous computational resources."
arxiv_id: "2607.08743"
arxiv_url: "https://arxiv.org/abs/2607.08743v1"
authors: "Ming-Zhe Han, Kenta Kiuchi, Masaru Shibata"
read_time: "3 min read"
slug: "sacra-k-a-performance-portable-numerical-relativity-code-wit-2607.08743"
---

## Opening

Numerical relativity simulations are essential for interpreting gravitational-wave observations from compact object mergers, but they demand enormous computational resources. A new performance-portable code called SACRA-K addresses this bottleneck by porting a mature Fortran simulation framework to modern accelerator hardware—GPUs and specialized processors—while maintaining the same physics and achieving **order-of-magnitude speedups**. This work bridges the gap between scientific accuracy and computational accessibility, potentially enabling more rapid and flexible simulations of binary black holes, black hole–neutron star systems, and binary neutron star mergers.

## What they found

Han, Kiuchi, and Shibata have successfully converted SACRA-MPI, a well-established Fortran code for simulating compact object mergers, into SACRA-K using the Kokkos library—a framework that allows a single codebase to run efficiently across different hardware platforms. The new code retains all the core physics: the BSSN spacetime evolution scheme, Z4c constraint propagation, adaptive mesh refinement, and high-resolution shock-capturing hydrodynamics from NANASI.

The validation is thorough. Across binary black hole, black hole–neutron star, and binary neutron star test cases, *waveform discrepancies between SACRA-K and SACRA-MPI remain well below both the scatter among independent numerical relativity codes and the resolution-dependent variation within SACRA-MPI itself*. Crucially, the waveform differences stay *at or below the distinguishability threshold of current gravitational-wave detectors*, meaning they would not affect interpretation of real observations. The code preserves π symmetry *exactly at the bitwise level*, a stringent test of numerical fidelity, and the gravitational-wave phase from a binary neutron star merger exhibits **second-order convergence**, confirming the expected numerical behavior.

On hardware performance, SACRA-K demonstrates substantial gains. In the smallest test configuration, the code runs **approximately an order of magnitude faster** on NVIDIA A100 GPU clusters or AMD MI300A APU clusters compared to SACRA-MPI on CPU clusters. The authors also demonstrate scaling across **up to 256 accelerator devices**, indicating the code can harness large-scale heterogeneous systems.

## Why it matters

Gravitational-wave astronomy depends critically on accurate numerical simulations to model merger waveforms and extract physical parameters from detector data. By making a validated, physics-rich code portable across vendor hardware and dramatically faster, SACRA-K lowers barriers to running high-resolution simulations. This is particularly valuable for binary neutron star mergers, where the interplay of gravity, hydrodynamics, and potentially magnetic fields requires fine spatial resolution. Faster turnaround times could enable more flexible parameter studies and rapid response to unexpected gravitational-wave events.

## What's next

The authors validate against existing SACRA-MPI results but do not discuss new science applications or future observational targets. The natural next steps would involve deploying SACRA-K for parameter estimation of real gravitational-wave events and exploring physics regimes—such as higher resolutions or different equation-of-state models—that were previously computationally expensive.

Starithm continuously monitors real-time gravitational-wave alerts and multi-messenger transients, making tools like SACRA-K essential for rapid theoretical interpretation.