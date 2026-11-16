---
title: "Suprathermal bulk viscosity in binary neutron star mergers"
date: "2026-11-16"
category: "Gravitational Waves"
excerpt: "When two neutron stars collide, the merged remnant rings with violent, large-amplitude density oscillations at **kHz frequencies**."
arxiv_id: "2611.18146"
arxiv_url: "https://arxiv.org/abs/2611.18146v1"
authors: "Pranjal Tambe, Debarati Chatterjee"
read_time: "3 min read"
slug: "suprathermal-bulk-viscosity-in-binary-neutron-star-mergers-2611.18146"
---

When two neutron stars collide, the merged remnant rings with violent, large-amplitude density oscillations at **kHz frequencies**. How quickly those oscillations are damped depends on microphysics deep inside the star, and in particular on bulk viscosity driven by Urca processes. In a new paper, Pranjal Tambe and Debarati Chatterjee calculate this viscosity without the usual small-amplitude assumption. They find that once oscillations become large enough, the damping can be dramatically stronger than standard treatments predict. *This may matter for how merger simulations model the post-merger remnant.*

## What they found

Numerical relativity simulations of binary neutron star mergers and core-collapse supernovae indicate that neutron star matter can be pushed far from chemical equilibrium. Urca processes (weak-interaction reactions that convert neutrons to protons and back) act to restore equilibrium, and in doing so they dissipate energy from the density oscillations as bulk viscosity.

Standard calculations typically work in the "subthermal" regime. There, the deviation from chemical equilibrium, μ_Δ, is assumed to be smaller than the temperature T. Tambe and Chatterjee instead compute the complete amplitude-dependent bulk viscosity, including the suprathermal regime where this condition breaks down. According to the authors, their calculation is the first to also include two in-medium effects:

- **Thermal blurring**, which smears the sharp Fermi-surface kinematics at finite temperature.
- **Collisional broadening** of nucleons.

Their key result is that nonlinear effects start to become important when the oscillation amplitude reaches about **10 percent of the background density**. In this regime, the bulk viscosity can increase by **three to five orders of magnitude**.

![Amplitude-dependent bulk viscosity computed for the IUF nuclear model at one of the densities considered in the study](https://arxiv.org/html/2611.18146v1/BV_IUF_nb1_2.svg)

The figure set includes results for at least two nuclear models (labelled IUF and QMC) and several densities. *This suggests the authors examined how the effect varies with the underlying equation of state and the density of the matter.*

![Amplitude-dependent bulk viscosity for the QMC nuclear model at a higher density](https://arxiv.org/html/2611.18146v1/BV_QMC_nb6_3.svg)

## Why it matters

Density oscillations of order ten percent are not exotic in a merger remnant. Simulations indicate that such large departures from equilibrium can occur. If the viscosity in that regime is orders of magnitude larger than small-amplitude estimates, then *the treatment of dissipation in merger simulations may need revisiting*.

The authors state that their results have important consequences both for simulations of binary neutron star mergers and for their multi-messenger observations. Post-merger dynamics shape the kHz gravitational-wave signal that future detectors hope to capture. They also influence the conditions that feed electromagnetic counterparts. Getting the damping physics right is part of connecting those observables back to the properties of dense matter.

## What's next

The abstract does not specify follow-up steps. A natural open question is how these amplitude-dependent viscosities change outcomes once they are incorporated into full numerical relativity simulations. In particular, it remains to be seen how they affect the evolution of the remnant and any imprint on gravitational-wave or electromagnetic signals.

The dependence on nuclear model and density also matters. If that dependence is significant, *it would raise the possibility that the suprathermal regime carries information about the equation of state*. This remains to be demonstrated, however.

Starithm tracks real-time gravitational-wave and multi-messenger alerts, so you can follow neutron star merger candidates as they're announced.