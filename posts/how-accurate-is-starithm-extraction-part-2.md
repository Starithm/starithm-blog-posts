---
title: "How accurate is Starithm? Part 2: like-for-like checks against Greiner's table and GRBweb"
date: "2026-11-17"
category: "Platform"
excerpt: "We re-measured Starithm's extracted values comparing only like with like. The redshift shown for a burst agrees with Greiner's GRB table within the stated error or written precision for 418 of 456 bursts (91.7%). Within the same instrument and energy band, Swift-BAT T90 and fluence agree with GRBweb within 10% for 95.5% and 96.7% of bursts, and Fermi-GBM T90 for 90.2%."
slug: "how-accurate-is-starithm-extraction-part-2"
read_time: "5 min read"
authors: "Starithm Team"
---

In [Part 1](/blog/posts/how-accurate-is-starithm-extraction) we checked the values Starithm extracts from GCN Circulars against independent catalogues. A gamma-ray burst researcher who read it suggested three changes: use Jochen Greiner's GRB table as the redshift reference; judge agreement by each value's own stated error and precision, not one flat tolerance; and compare T90 and fluence only within the same instrument and energy band. This post gives the numbers measured that way. Part 1 stays as published, so its figures can still be cited as they were.

## Redshift, against Greiner's table

**Reference:** [Greiner's GRB table](https://www.mpe.mpg.de/~jcg/grbgen.html), which marks the kind of each redshift: upper limit, photometric, host galaxy, or uncertain.

We compare the one redshift each event page shows, and only where it was read from a circular (not taken from a catalogue). Two values are compared only when both sides report the same kind of measurement (a value or a limit) by the same method (spectroscopic or photometric). They agree when they differ by no more than the sum of their stated errors or, where no error is stated, half a unit of the last decimal written: "3.07" stands for 3.065 to 3.075.

| | Bursts |
|---|---|
| Shown redshift matched in Greiner's table | 486 |
| A limit on one side or both | 27, of which 25 are consistent |
| Different methods, not compared | 3 |
| **Compared like with like** | **456** |
| Agree within stated error or written precision | **418 (91.7%)** |
| Agree within Δz = 0.01, the Part 1 rule | 435 (95.4%) |

The stricter rule scores lower because it does not forgive rounding. Of the 38 disagreements, **25 differ by 0.0005 to 0.03**: one side reports a refined or more precise value of the same measurement.

The other **13 differ by more than 0.1**, and they are the ones that matter. In every one, the value we show is stated in a circular; what is wrong is which of the burst's reported values we chose:

- **A value cited for another burst:** GRB 980703 shows 3.418, the redshift a circular reported for GRB 971214.
- **Tentative or later superseded claims** (GRB 971214, GRB 060123).
- **Estimates from a break in the spectrum**, not a measured redshift (GRB 060604, GRB 060927).
- **Galaxies that are not the host** (GRB 060708, GRB 060912).
- **A gas cloud along the line of sight** (GRB 141028A).

Part 1 found the same problem in its first form and we fixed it by labelling whose redshift each value is. These 13 are what that labelling does not yet cover. The next step is to show every reported redshift with its source and mark the current best, rather than pick one silently.

## T90 and fluence, per instrument and band

**Reference:** [GRBweb](https://user-web.icecube.wisc.edu/~grbweb_public/), using its per-instrument tables, not its summary table. The summary takes each burst's T90 and fluence from whichever instrument saw it and does not say which, so it cannot be compared band for band.

A circular value is compared only with the same instrument's catalogue value, and only when the band it states is the catalogue's band.

| Instrument and quantity | Band | Bursts | Within 10% |
|---|---|---|---|
| Swift-BAT T90 | 15–350 keV | 179 | **171 (95.5%)** |
| Swift-BAT fluence | 15–150 keV | 183 | **177 (96.7%)** |
| Fermi-GBM T90 | 50–300 keV | 112 | **101 (90.2%)** |
| Fermi-GBM fluence | 10–1000 keV | 142 | 56 (39.4%) |

Matching the band changed the GBM T90 result most. In Part 1 we said comparing GBM with GRBweb measured early circulars against final catalogues. Partly it did: many GBM circulars give T90 in 8–1000 keV, while the catalogue uses 50–300 keV. Compared in the same band, GBM T90 agrees for 90.2% of bursts.

GBM fluence is still far apart, and the band is not the reason. GBM circulars are written within hours of a trigger and the catalogue is redone later, often over a different time interval. We read a sample of the disagreeing circulars, and each states the value we extracted ("The event fluence (10-1000 keV) in this time interval is (1.52 ± 0.05)E-05 erg/cm²" for GRB 240727B, against the catalogue's 2.85 × 10⁻⁶). Across these bursts the circular value is a median 1.09 times the catalogue's. That row measures the circulars, not how we read them. If you need a final GBM fluence, use the catalogue value, which Starithm shows beside the circulars' where it has one.

## What these numbers do not cover

- **What we missed.** A catalogue check says whether what we extracted is right, not what we failed to extract. Measuring that needs a set of circulars annotated by hand before anything reads them, which does not yet exist for GCN Circulars.
- **Other bands.** Values in bands the catalogues don't use, including most GBM circular values (8–1000 keV), and durations that state no band ("lasted about 20 s"), are not compared here.
- **Other quantities and transients.** Magnitudes, limits and X-ray fluxes have no independent catalogue to check against, and the comparisons cover gamma-ray bursts only.

The catalogues are not ground truth either. GRBweb, Greiner's table and the Swift GRB table agree with each other for about 96–97% of the bursts they share, so a residual of a few per cent is expected.

## How we measured

Redshift: Greiner's table as of 16 November 2026, compared with the shown redshift of each event page that took it from a circular. T90 and fluence: GRBweb's per-instrument tables as of 17 November 2026; a burst counts as agreeing when at least one value extracted from its circulars is within 10% of the catalogue's. We use these catalogues only to check our own numbers; neither is redistributed here.

---

## Live Event Pages

Every gamma-ray burst in these comparisons has an event page with its values and the circulars they came from: [starithm.ai/novatrace](https://starithm.ai/novatrace).
