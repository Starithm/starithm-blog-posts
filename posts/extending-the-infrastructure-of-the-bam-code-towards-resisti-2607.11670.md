---
title: "Extending the infrastructure of the BAM code towards resistive general-relativistic magnetohydrodynamics: tests and first applications"
date: "2026-07-19"
category: "GRB"
excerpt: "Neutron star mergers and pulsars represent some of the universe's most extreme laboratories, where magnetic fields reach strengths that dwarf anything we can create on Earth."
arxiv_id: "2607.11670"
arxiv_url: "https://arxiv.org/abs/2607.11670v1"
authors: "Matthew Beaudoin, Maximilano Ujevic, Ramon Jaeger et al."
read_time: "3 min read"
slug: "extending-the-infrastructure-of-the-bam-code-towards-resisti-2607.11670"
---

## Why This Matters

Neutron star mergers and pulsars represent some of the universe's most extreme laboratories, where magnetic fields reach strengths that dwarf anything we can create on Earth. Yet our ability to simulate these events has been limited by a fundamental assumption: that the plasma surrounding neutron stars conducts electricity perfectly. A new extension to the BAM numerical-relativity code challenges this assumption by incorporating resistive effects into general-relativistic magnetohydrodynamic (GRMHD) simulations. This development matters because it allows researchers to capture non-ideal processes—Ohmic dissipation and magnetic reconnection—that the standard ideal-MHD approximation simply cannot describe. For the first time, Beaudoin and colleagues demonstrate that these effects can be modeled stably in realistic neutron star merger scenarios, revealing that parallel electric fields can reach up to **10% of the total electric field strength** in low-density regions where ideal MHD breaks down.

## What They Found

The team validated their resistive GRMHD implementation through two complementary approaches. First, they ran an extensive suite of special-relativistic magnetohydrodynamic benchmark tests—the standard validation toolkit for any new MHD code. These tests confirmed that the numerical methods work correctly in controlled settings. Second, they performed simulations of both isolated neutron stars and binary neutron star mergers, demonstrating that the code remains stable even in the complex, dynamical environments of merger events.

The key discovery concerns the role of non-ideal effects in post-merger evolution. In ideal MHD, the component of the electric field parallel to the magnetic field is strictly zero—a mathematical consequence of infinite conductivity. However, when finite conductivity is included, this parallel component becomes non-zero, reaching up to **10% of the total electric field strength**. The authors emphasize that this effect appears particularly pronounced in low-density regions, *suggesting that non-ideal processes may be important for accurately modeling the long-term evolution of post-merger remnants*. The study also investigates how finite conductivity affects magnetic-field amplification and mass ejection, though the authors note their investigation was restricted to simplified piecewise-polytropic equations of state.

![Validation of resistive GRMHD implementation through benchmark tests](https://arxiv.org/html/2607.11670v1/x1.png)

## Why It Matters

For multi-messenger astronomy, accurate modeling of neutron star mergers is crucial. These events produce gravitational waves, electromagnetic radiation across the spectrum, and potentially the r-process nuclei that seed the universe with heavy elements. Non-ideal MHD effects influence how magnetic fields evolve, which in turn affects particle acceleration, jet formation, and the dynamics of ejected material. By capturing these processes, the resistive GRMHD framework brings simulations closer to physical reality.

## What's Next

The authors acknowledge that their current work uses simplified equations of state. Future investigations employing more realistic microphysics—including temperature-dependent conductivity and neutrino interactions—represent the natural next step. These refinements will test whether the **10% parallel electric field** effect persists under more astrophysically realistic conditions and whether it influences observable signatures of mergers.

Starithm continuously monitors real-time alerts for gravitational wave events and electromagnetic counterparts to neutron star mergers, helping researchers connect simulations like these to actual observations.