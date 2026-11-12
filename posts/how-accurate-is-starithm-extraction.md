---
title: "How accurate is Starithm? Redshift, T90 and fluence checked against independent catalogues"
date: "2026-11-12"
category: "Platform"
excerpt: "Starithm reads GCN Circulars and stores the values they report. We checked those values against independent catalogues: for 327 of 346 gamma-ray bursts (94.5%) at least one extracted redshift agrees with GRBweb to within Δz = 0.01, and Swift-BAT T90 and fluence agree with the Swift GRB table to within 10% for 92.2% and 94.5% of bursts. Here is how we measured it, and where we are still wrong."
slug: "how-accurate-is-starithm-extraction"
read_time: "6 min read"
authors: "Starithm Team"
---

# How accurate is Starithm? Redshift, T90 and fluence checked against independent catalogues

Starithm reads every GCN Circular it ingests and stores the values it reports: positions, redshifts, durations, fluences, magnitudes and upper limits, each linked to the circular it came from. A language model does the reading, and values are checked against the circular's own text before they are stored. That check tells us a value appears in the circular. It does not tell us whether we read the right value. For that we need an outside reference, so we compared what we extracted with catalogues we had no part in building.

This post gives the numbers, how we measured them and the cases where we are wrong. As of 12 November 2026, Starithm has extracted 16,542 circulars; the rest of the 45,983 in the archive are still being processed.

## Redshift

**Reference:** [GRBweb](https://user-web.icecube.wisc.edu/~grbweb_public/), a compilation of gamma-ray burst properties maintained by IceCube, refreshed daily.

The pipeline recorded a numeric redshift for 601 gamma-ray bursts, of which 346 also carry a redshift in GRBweb. **For 327 of these (94.5%) at least one extracted value agrees with the catalog to within Δz = 0.01.**

That is the per-burst measure. Two stricter ones are worth giving too:

| What is compared | Agree within Δz = 0.01 |
|---|---|
| Per burst: at least one extracted value | **327 of 346 (94.5%)** |
| Every circular that states a redshift, one by one | 783 of 897 (87.3%) |
| The single redshift shown on the event page | 306 of 356 (86.0%) |

The gap between the first line and the other two is mostly not misreading. We read every disagreeing circular:

- **The circular states that value, rounded or citing another circular:** "the z ~ 7.3 GRB 250314A", where GRBweb has 7.27. Correctly read, but outside a 0.01 tolerance.
- **A photometric redshift of a nearby galaxy (24) or a candidate host galaxy (16):** the circular reports it, and it is not the burst's redshift.
- **A limit stored as a value (6):** "z < 3.3" stored as 3.3.
- **An intervening absorber (3):** a spectrum shows gas at several redshifts, and we took a foreground system.
- **Genuine errors (3):** a value not in the text, or one from a different burst.

So the extraction usually finds the right number. Where we go wrong is in **telling what kind of redshift it is**: the burst's own, a host candidate, a photometric estimate, a limit or a foreground absorber. When we choose one redshift to show for a burst, that choice is wrong about one time in seven. That is the number we are working on.

## T90 and fluence

**Reference:** the [Swift GRB table](https://swift.gsfc.nasa.gov/archive/grb_table/), the Swift team's table of Burst Alert Telescope (BAT) results.

We compared like with like: values extracted from the Swift-BAT refined-analysis circulars against the table's BAT values for the same bursts.

| Quantity | Bursts | Within 1% | Within 5% | Within 10% |
|---|---|---|---|---|
| T90 (15–350 keV) | 386 | 319 (82.6%) | 347 (89.9%) | **356 (92.2%)** |
| Fluence (15–150 keV) | 382 | 298 (78.0%) | 349 (91.4%) | **361 (94.5%)** |

We read the circular for every burst outside 10%. Most are from 2005 to 2007, and in those the circular states exactly the value we extracted: the table holds a different value, most likely from a later re-analysis. GRB 060929's circular gives a T90 of 12.4 s; the table gives 554 s.

The errors that are ours fall into two kinds:

- **Milliseconds stored as seconds (3 bursts):** "T90 (15–350 keV) is 80 ± 10 msec" stored as 80 s.
- **A circular's typo stored as written (2 bursts):** "(1.8 ± 0.15) × 10^6 erg/cm²", where 10⁻⁶ was meant. A value like that is physically impossible and should be flagged rather than stored.

## Why not compare T90 and fluence with GRBweb too

We tried. For bursts detected by Fermi, GRBweb takes T90 and fluence from the Fermi GBM burst catalogue, and the GBM circulars give earlier, preliminary values, often over a different time interval. GRB 241105A's circular reports a T90 of about 1.4 s for its main pulse; the catalogue's T90 includes the extended emission that follows.

Against GRBweb, then, the comparison measures how early circulars differ from final catalogues, not whether we read them correctly. That difference is itself useful to know: across the 358 GBM circular fluences we compared, the circular value is a median of 1.09 times the final catalogue value, and a quarter of them are more than 1.5 times it. If you need the final value, use the catalogue; Starithm shows catalogue values alongside the circulars' where it has them.

## What we are changing

1. **Every redshift gets a kind:** the burst's own (from a spectrum), intervening absorber, host candidate, photometric estimate, limit, or a citation of another circular.
2. **The redshift an event page shows will be chosen by kind:** the burst's own spectroscopic value over a host candidate, the highest of several absorption systems, and values that later circulars confirm.
3. **Durations are converted to seconds in code, and impossible values are flagged** instead of stored.
4. **The same checks will be extended** to positions and to more instruments, and run regularly so that a change that makes extraction worse shows up when it happens.

We will update this post as the numbers change.

## How we measured

Tolerances: Δz = 0.01 for redshift; relative 1%, 5% and 10% for T90 and fluence. A burst counts as agreeing when at least one value extracted from its circulars falls within the tolerance, except in the "shown on the event page" line, which uses only that one value. Fluence is compared only in the 15–150 keV band, the band the Swift table uses.

We use GRBweb and the Swift GRB table only to check our own numbers; neither is redistributed here.

---

## Live Event Pages

Every gamma-ray burst in these comparisons has an event page with its values and the circulars they came from: [starithm.ai/novatrace](https://starithm.ai/novatrace).
