---
title: "Ears to the Universe: the James Webb Space Telescope, as music, every day"
date: "2026-09-15"
category: "Platform"
excerpt: "Every day, new James Webb Space Telescope observations become public. We turn a few of them into music you can follow across the target, note by note, with a short poem and a plain explanation of what you are hearing."
slug: "ears-to-the-universe"
read_time: "6 min read"
authors: "Starithm Team"
---

Every day, new observations from the James Webb Space Telescope become public in the Mikulski Archive for Space Telescopes (MAST). Many of them are spectral cubes: images in which every pixel holds a complete spectrum of infrared light. Astronomers read them as plots and maps.

We wanted to hear them.

**Ears to the Universe** is a new page on Starithm where, every day, a few of those freshly public observations become music. Each track follows the telescope's view of its target region by region, and comes with a short poem and a plain-language note on the science behind the sound.

Listen at [starithm.ai/ears-to-the-universe](https://starithm.ai/ears-to-the-universe).

## Light already has a shape

A spectrum is not far from a chord. Gas glowing around young stars shines at a handful of exact wavelengths, which show up as sharp bright lines: hydrogen here, ionized neon there. Cooler gas and dust do the opposite and take light away, leaving narrow dips. The pattern of lines and dips is a fingerprint of what the gas is made of, how hot it is, and how it moves.

JWST's integral field spectrographs, NIRSpec and MIRI, record that fingerprint for every spot on the sky they observe. So a spectral cube is really a map of chords. Our job is to play it in an order that makes sense, without inventing anything along the way.

## From a new cube to a finished track

**1. Find what became public today.** Each day the pipeline asks MAST for the spectral cubes released that day. It skips calibration programs and background pointings, treats different names for the same patch of sky as one source, and picks a few science targets from different programs.

**2. Identify the target.** A lookup in the SIMBAD astronomical database tells us what the target is and how fast it is moving away from us. That matters more than it sounds. Mrk 1066, a Seyfert 2 galaxy, is receding at about 3,600 km/s, which shifts its ionized neon line from 12.81 to 12.97 microns. Without that correction, the brightest line in the observation would go unnamed.

**3. Walk the target.** The cube is divided into roughly 250 to 350 regions, and the song spends about a third of a second on each. By default it starts at the brightest region and spirals outward, so you hear a galaxy's nucleus first and its outskirts last.

**4. Turn light into sound.**

- **Pitch follows wavelength.** Shorter wavelengths play higher notes, on a five-note scale spanning four octaves. Each track chooses its own key and scale, so no two nights climb quite the same ladder. Each note leans very slightly toward the exact pitch of its spectral line, so two lines that share a note still sound apart.
- **Emission lines ring.** Wherever a line stands more than four standard deviations above the noise, it sounds as a tone, and a struck instrument marks the moment it grows stronger: a bell, a marimba, a harp or a plucked guitar, depending on the track.
- **Absorption breathes.** Narrow dips, where cooler gas takes light away, sound as a quiet band of breath at that note's pitch.
- **Brightness hums.** A low sustained voice rises and falls with how bright each region is.

There is also a **Raw light** version that plays the whole spectrum as continuous sound, closer to the data and less melodic. You can switch between the two while listening.

## Keeping it honest

Sonification can easily turn into decoration, so a few rules keep every note tied to a measurement:

- Lines are identified at the instrument's full spectral resolution, within 600 km/s of where they should appear, and a feature is only named if it is clearly above the noise.
- The continuum each line is measured against spans a fixed velocity width of 3,000 km/s, so the method means the same thing for NIRSpec and MIRI.
- NIRSpec cubes have a small wavelength gap between the instrument's two detectors, and the data right next to it is unreliable. Those channels are masked before anything is played, so the gap's ragged edges can't pass themselves off as lines.

## Two tracks from the first day

**[The Shifting Heart](https://starithm.ai/ears-to-the-universe/2026-09-13/jw07802-c1006_t003_miri_ch3-short)** comes from Mrk 1066, a Seyfert 2 galaxy: an active galaxy whose bright nucleus is powered by a supermassive black hole. In MIRI's mid-infrared view, ionized neon dominates as a low, steady voice, with warm molecular hydrogen and hydrogen recombination lines above it. Because the song starts at the nucleus and spirals out, you hear the energetic core first, then the gas thinning toward the edges.

**[Breath of the Deep Core](https://starithm.ai/ears-to-the-universe/2026-09-13/jw08887-c1017_t004_miri_ch3-short)** comes from G19.88-0.53, a region where massive stars are forming. Here a single voice carries almost everything: warm molecular hydrogen, sounding as a clear bell near the brightest part of the map and thinning to a thread of sound as the song moves into the darker surroundings.

Absorption is easiest to hear in denser starlight. In the Arches Cluster, one of the densest young star clusters in the Milky Way and one of the cubes we used to build the pipeline, carbon monoxide absorption from cooler stars in the field breathes quietly beneath the ringing hydrogen.

## The poem

Each track comes with a short poem written by an AI model. The model sees the map of the target with the song's path drawn on it, plus a list of what was actually measured: which lines were detected, when in the song each one is loud, and how bright each stretch is.

It has no say over which notes are played. Every pitch, every moment and every loudness comes from the measurement.

A second model does have a say, but only over how those notes sound. Before a track is rendered, it reads the same measured facts and chooses the instruments, the key and scale, and how much echo the piece carries, all from a fixed catalogue it cannot step outside. The data still decides every note; the model decides what plays them. Its one-line explanation is held to the same plain language as the poem, and the page names the instruments it chose.

Before a poem is published, automated checks reject any mention of a gas that wasn't detected, and keep technical labels out of the verse. The science note beneath the poem stays in plain prose, and the page says clearly that the poem is AI-written.

## What you'll see on the page

- **The map** of the target, with a glowing dot that follows the song across it
- **A note ladder** showing how loud each note is at every moment, marked with the element behind it: solid bars ring, hatched blue bars breathe
- **A spectrogram** of the music you can click to jump anywhere
- **The poem**, stanza by stanza, lighting up in time with the music
- **Shareable moments**: add `?t=42` to a track's link to start at 42 seconds

## Standing on good shoulders

Turning astronomical data into sound isn't new, and some of the best work inspired this project. NASA's sonifications of Chandra and Webb images, the Rubin Observatory's SkySynth, and the RubinRhapsodies effort to make survey data accessible to blind and visually impaired researchers all showed how much the ear can pick up.

What we're adding is a daily, automatic pipeline built on newly public spectral cubes, where every note can be traced back to a measured line in a specific observation.

## What's next

This is a first version. We're exploring different instruments and styles, a weekly album gathering the week's tracks, and a series following the few targets JWST returns to again and again, like the Large Magellanic Cloud and the Hubble Ultra Deep Field. If you're a researcher with an observation you'd like to hear, or ideas on how a spectrum should sound, we'd love to hear from you.

New tracks arrive every day at [starithm.ai/ears-to-the-universe](https://starithm.ai/ears-to-the-universe).

---

*This work is based on observations made with the NASA/ESA/CSA James Webb Space Telescope. The data were obtained from the Mikulski Archive for Space Telescopes at the Space Telescope Science Institute, which is operated by the Association of Universities for Research in Astronomy, Inc., under NASA contract NAS 5-03127 for JWST. This research has made use of the SIMBAD database, operated at CDS, Strasbourg, France.*

## Cite This Post

```bibtex
@misc{starithm2026ears,
  title     = {Ears to the Universe: the James Webb Space Telescope, as music, every day},
  author    = {{Starithm Platform}},
  year      = {2026},
  url       = {https://starithm.ai/blog/posts/ears-to-the-universe},
  note      = {Daily sonification of newly public JWST spectral cubes}
}
```
