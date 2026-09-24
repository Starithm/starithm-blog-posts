---
title: "What our sonification can and cannot tell you"
date: "2026-09-23"
category: "Platform"
excerpt: "We spent a week testing whether Ears to the Universe actually distinguishes one observation from another. It resolves chemistry rather than objects, one of its four voices turned out to be an artifact of a design choice, and three of our own conclusions were wrong before we got here."
slug: "what-the-sonification-can-and-cannot-tell-you"
read_time: "8 min read"
authors: "Starithm Team"
---

Two weeks ago we launched [Ears to the Universe](https://starithm.ai/ears-to-the-universe), which turns newly public James Webb Space Telescope spectral cubes into music every morning. The claim we made then was that every note comes from a measurement. That claim is true, and it is also not the interesting question.

The interesting question is whether the music **distinguishes** anything. If you played someone two tracks, could they tell that one came from a star-forming region and the other from an active galaxy? Does the sound carry information about the object, or does it only carry the fact that some numbers went in?

Sonification projects rarely publish an answer to that. We ran eleven tests against our own first version, and this is what came back, including the parts that do not flatter us.

> **Correction, 24 September 2026.** A reader spotted an internal contradiction in how we described the wavelength mapping. Chasing it down found a real error in our method: we had compared tracks rendered in different musical scales on the assumption that a wavelength always lands on the same rung. It does not. The correction is in Finding 2, and it makes the result **stronger** than the version first published, not weaker. The original numbers are kept below so the change is visible.

## The short version

- **The notes carry the chemistry.** Every detected emission line lands on the pitch it should, and you can work backwards from a dominant note to a wavelength and hence to a species.
- **It resolves chemistry, not identity.** Two different star-forming regions that both show molecular hydrogen and ionized neon produce nearly identical note patterns. We found four such pairs in three weeks of output.
- **One of the four voices is mostly a design choice.** The low drone's shape across a track reflects the route the song takes across the image more than it reflects the target.
- **The rhythm is an accident of the pointing.** Shift the telescope's field by one spaxel and the timing of the piece changes almost as much as swapping in a different object entirely.
- **Our daily variety masks all of this.** Because instruments and key change from day to day, two tracks of nearly identical measurements still sound like different pieces.

## How we tested it

Every track publishes a data layer alongside its audio: a matrix of how loud each of twenty-one ladder notes is at each step of the walk, the brightness that drives the drone, and which spectral lines were detected. That makes the music comparable as numbers rather than as impressions.

Comparing tracks means knowing what is invariant between them, and our first description of this was wrong. Three stages have to be kept apart:

1. **Wavelength to position.** Logarithmic across the observed band. Depends only on the band.
2. **Position to rung.** The position is snapped to the nearest note of the chosen scale. **This depends on the scale's interval pattern.**
3. **Rung to frequency.** Set by the key.

Because the frequency range is anchored to the scale's own lowest note, transposing the whole thing moves the wavelengths and the rungs together. So the rung a wavelength lands on is **invariant to the key** but **not to the scale type**. Measured over 2,000 wavelengths across the band: 0.0% of them move between C, D and G major pentatonic, but 16.7% to 24.9% move between major pentatonic, minor pentatonic, suspended and hirajoshi.

We originally claimed the rung was invariant to both, and compared tracks across different scale types on that basis. Only 37 of the 120 pairs below were valid comparisons.

We compare two things. The **histogram** is which notes ring across the whole song, ignoring when. The **surface** keeps the timing. The gap between those two turned out to be the entire story.

## Finding 1: the notes really do carry the physics

For each detected line, we predicted which note it should land on from its observed wavelength, then checked against the notes that actually carry the most energy.

| object | line | predicted note | loudest measured |
|---|---|---|---|
| Mrk 1066 | ionized neon, 12.97 µm | 4.92 | **5** (24% of energy) |
| Mrk 1066 | hydrogen, 12.52 µm | 9.49 | **9** (10%) |
| Mrk 1066 | molecular hydrogen, 12.43 µm | 10.50 | **10** (15%) |
| G19.88-0.53 | molecular hydrogen, 12.28 µm | 12.06 | **12** (60%) |

Every line lands on its predicted note, in rank order. The chain from wavelength to audible pitch survives the render intact and can be run backwards. With the mapping key and reference tone we publish on every track, a listener has everything needed to do that inversion.

One honest qualification: the pipeline is *built* to make lines ring, so this partly confirms the plumbing rather than discovering something. What it rules out is that the mapping gets lost somewhere between the measurement and the speaker. It does not.

## Finding 2: it hears chemistry, not objects

This is the one that matters, and it is not what we expected.

We took all sixteen tracks observed in the same mid-infrared band and compared every pair. Grouping by whether two tracks share a line inventory:

Distance here is 1 minus correlation, so 0 means identical and 1 means unrelated.

| | same lines detected | different lines |
|---|---|---|
| all 120 pairs, **as first published** | 0.566 (n=13) | 0.700 (n=107) |
| **valid pairs only** (matched scale type) | **0.150** (n=4) | **0.690** (n=33) |

The first row is the mistake. Mixing scale types added noise to both groups and left them barely separated, which is why the original version of this post said the ranges "overlap almost completely". Restricted to comparisons that are actually meaningful, sharing a line inventory makes two tracks about four and a half times more similar.

Because 16 tracks give 120 pairs but each track appears in many of them, those pairs are not independent observations. Bootstrapping over **targets** rather than pairs, 4,000 resamples:

| group | mean | 95% CI |
|---|---|---|
| same inventory | 0.168 | 0.026 to 0.437 |
| different inventory | 0.681 | 0.422 to 0.872 |

The ordering held in 99.9% of resamples, so the direction is not in doubt. The intervals touch at their extremes, so the size of the effect is not pinned down by 16 targets. And at the close end:

| pair | distance | lines |
|---|---|---|
| G11.92-0.61 MM1-C1 vs GAL 014.33-00.64 | **0.026** | both H2 + neon |
| GAL 014.33-00.64 vs IRAS 18182-1433 B | **0.055** | both H2 + neon |
| G11.92-0.61 vs IRAS 18182-1433 B | **0.082** | both H2 + neon |

Three different star-forming regions, hundreds of light years apart, producing essentially the same note pattern.

We think this is fidelity rather than failure. Those regions genuinely do have similar spectra in the dimensions this sonification listens to. Similar input producing similar output is what a faithful instrument should do. But it means the honest claim is that **you can hear the chemistry, not the object**, and anyone who tells you their sonification lets you recognise individual astronomical sources should be asked for their numbers.

## Finding 3: the drone follows the route, not the target

The low sustained voice under every track follows continuum brightness. That is true at every moment. But the *shape* of that voice across a whole song turns out to be dominated by the path the song takes.

Mean drone level in each third of the track:

| track | first third | middle | last third |
|---|---|---|---|
| Mrk 1066, spiral outward | 10.6 | 0.9 | 0.3 |
| G19.88-0.53, spiral outward | 10.8 | 4.8 | 2.0 |
| 175 Andromache, spiral outward | 8.1 | 0.1 | 0.0 |
| Mrk 1066, walked **inward** | 0.3 | 0.9 | **10.3** |

Three unrelated objects walked outward from their brightest region all produce the same falling arc, because that is what walking outward from the brightest region does. Walk the same object the other way and the arc reverses.

So a listener hearing a track fade toward silence is hearing a routing decision we made, not something about the target. We have added a line saying so to the mapping key on every track.

## Finding 4: the rhythm belongs to the pointing, not the object

We took one cube and made four damaged copies: two with added noise at one and three times the measurement noise, two with the field shifted by one and two spaxels. Then rendered all of them identically.

| perturbation | histogram | with timing |
|---|---|---|
| noise, 1σ | 0.994 | 0.968 |
| noise, 3σ | 0.959 | 0.822 |
| field shifted 1 spaxel | 0.998 | **0.577** |
| field shifted 2 spaxels | 1.000 | 0.786 |
| *different objects, for comparison* | *0.974 at closest* | *0.140 to 0.484* |

All four still detect the same three lines.

Read the two columns against each other. The histogram shrugs everything off: three sigma of noise barely moves it, a two-spaxel shift not at all. But add timing and a one-spaxel nudge drops the correlation to 0.577, which is barely outside the range we measure between completely different objects.

The moment-to-moment structure of one of our tracks is therefore not a property of the target. It is a property of exactly where the telescope happened to be pointing. It makes every track unique without making any track identifiable.

## Finding 5: our own variety hides all of this

Everything above is measured on the data layer. What a listener actually hears has been through instruments, reverb and normalisation.

Two palettes happen to repeat in our published output with different data behind them, which gives a natural experiment.

| comparison | timbre | full sound |
|---|---|---|
| same palette, 0 lines vs 3 lines | +0.623 | **+0.251** |
| same palette, 1 line vs 2 lines | +0.985 | +0.795 |
| near-identical data, different palettes | +0.607 to +0.814 | +0.476 to +0.639 |

The good news is that data is audible: the most different pair in the whole set is two tracks sharing a palette where one has three detected lines and the other has none.

The bad news is that swapping the palette produces a comparable audible difference between tracks whose underlying measurements are nearly the same. Since we deliberately vary palettes daily so more of the catalogue gets heard, a listener comparing any two of our tracks cannot tell which part of the difference is the universe and which part is us.

Hear it for yourself. These two were rendered with the same instruments and the same walk, so the only difference is the observation behind them. The first has no detected emission lines, the second has three.

[No lines detected: OGLE-2002-BLG-360, 8 September](https://pub-98ea3f3b6e584f4ba217ccf6bcc4bc1f.r2.dev/tracks/2026-09-08/jw06821-c1005_t007_miri_ch3-short/musical.m4a)

[Three lines detected: NGC 6644, 15 September](https://pub-98ea3f3b6e584f4ba217ccf6bcc4bc1f.r2.dev/tracks/2026-09-15/jw07965-c1003_t001_miri_ch3-short/musical.m4a)

And here is the problem, in the same medium. These two observations have **nearly identical** measurements, a distance of 0.026 on the note pattern. They sound like different pieces because we gave them different instruments.

[GAL 014.33-00.64, rendered with synth](https://pub-98ea3f3b6e584f4ba217ccf6bcc4bc1f.r2.dev/tracks/2026-09-21/jw08887-c1041_t015_miri_ch3-short/musical.m4a)

[IRAS 18182-1433 B, rendered with choir](https://pub-98ea3f3b6e584f4ba217ccf6bcc4bc1f.r2.dev/tracks/2026-09-21/jw08887-c1042_t017_miri_ch3-short/musical.m4a)

We already say on every track that instruments carry no information. We can now say it with a number behind it, and you can hear what that number means.

## Four things we got wrong on the way here

We are including this because the errors were more instructive than the results, and because a findings post that reports only the final answer is hiding its own method.

**"Two different objects never sound the same."** We asserted this after comparing three cubes that happened to have three, one and zero detected lines. Objects with different line counts sounding different is arithmetic, not evidence. The corpus comparison above overturned it.

**"The same object sounds like itself."** We reported a reassuring number for two tracks sharing a catalogue identifier, then noticed they were two different *pointings* within the same cluster. They are different fields of view. We have never actually measured reproducibility on a repeated observation, because in three weeks of daily output there has not been one.

**"The arrangement cannot move a single note."** It can. Changing the musical scale changes the ladder, so the same measured wavelength snaps to a different rung, affecting about a fifth of the note grid. We have corrected the wording in [the original post](https://starithm.ai/blog/posts/ears-to-the-universe) accordingly.

**"A wavelength lands on the same rung whatever the scale."** It lands on the same rung whatever the *key*, which is not the same claim. Scale type changes the interval pattern, so it changes the rung, for up to a quarter of the band. We had derived this from a formula on paper instead of from the code that actually runs, and it invalidated most of the pair comparisons in Finding 2. Corrected above. This one was caught by a reader, not by us.

The pattern in the first three is the same: we generalised from a small sample chosen for convenience, and the correction came from data our own pipeline had been publishing daily the whole time. The fourth is a different failure and a more embarrassing one, which is that we documented what we believed the system did rather than checking what it did.

## What we have not tested

**No human has listened to anything.** Every number here is a correlation between matrices. Those are proxies for perception, not perception. A proper listening test is the obvious next step and we have not run one.

**The samples are small.** Sixteen comparable tracks, five audio pairs, one repeated target that turned out not to be a repeat.

## What changes

The mapping key on every track now carries a line about the drone's arc reflecting the route. The original post's description of how notes are chosen has been tightened.

The deeper items we are not fixing today, because they need thought rather than a patch. If timing is an artifact of pointing, the walk may need to be anchored to something physical rather than to the grid. If daily palette variety masks data differences, then variety and legibility are in direct tension and we chose variety without noticing we were choosing.

We would rather publish the measurements than wait until we have answers we like better.

---

*Every number in this post can be reproduced from the published tracks. This work is based on observations made with the NASA/ESA/CSA James Webb Space Telescope, obtained from the Mikulski Archive for Space Telescopes at STScI, operated by AURA under NASA contract NAS 5-03127. This research has made use of the SIMBAD database, operated at CDS, Strasbourg, France.*

## Cite This Post

```bibtex
@misc{starithm2026sonificationvalidity,
  title     = {What our sonification can and cannot tell you},
  author    = {{Starithm Platform}},
  year      = {2026},
  url       = {https://starithm.ai/blog/posts/what-the-sonification-can-and-cannot-tell-you},
  note      = {Validity tests on daily JWST spectral-cube sonification}
}
```
