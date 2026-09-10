# IEEE Core Invitation — Design Blueprint

## Locked direction

- Reference: `https://mindmarket.com/`
- Deliverable: one immersive invitation landing page for former IEEE core-team members.
- Fidelity target: preserve the reference site's page rhythm, motion language, Rive artwork, illustrated scroll path, card mechanics, navigation behavior, typography scale, microinteractions, and responsive composition.
- Content target: all marketing copy is replaced by an invitation narrative. Guest names, final date, venue, RSVP URL and the invitation film remain editable content values.

## Reference teardown

The live homepage is an Astro site using Inter, Rive Canvas Lite, GSAP/DrawSVG-style path animation, a Lenis smooth-scroll layer, and inline SVG paths. It does not use WebGL, Three.js, a GLB, a scrubbed video, or a real-time 3D scene. The visual depth comes from layered 2D vector art, sticky compositions, parallax and canvas animation.

The measured desktop hero uses a 1440×900 viewport, a 139.68px headline with 132.69px line height, a 1224px floating navigation shell, and a 6,000px+ illustrated story path. Mobile switches to a compact floating menu and full-width story cards.

## Brand tokens

| Role | Value |
| --- | --- |
| Ink | `#2c2e2a` |
| Paper | `#f5f1e4` |
| Primary green | `#8ed462` |
| Coral | `#ff705d` |
| Yellow | `#f5e211` |
| Blue | `#349df3` |
| Pink | `#e9afff` |
| Typeface | Inter 400 / 500, self-hosted |
| Primary easing | `cubic-bezier(.22,1,.36,1)` |

## Section order

1. Draw-on preloader
2. Floating navigation and full-screen hero with Rive ensemble
3. Invitation introduction
4. Four-part illustrated scroll story with Rive characters and SVG path drawing
5. Animated timeline finale
6. "Ready when you are" invitation callout
7. Final uploaded video slot
8. Three memory cards
9. Three moving guest-name rails
10. Oversized yellow event footer

## Motion system

| Interaction | Treatment |
| --- | --- |
| Preloader | 1s SVG draw, dot pop, 600ms veil fade |
| Hero | clipped line rise, delayed subhead, scroll-linked copy fade and illustration scale |
| Timeline | path stroke dash maps to timeline scroll progress |
| Story cards | white front and colored back separate vertically on entry |
| Character scenes | looping Rive playback plus low-amplitude parallax |
| Buttons | colored wipe, opposing circular arrow slide |
| Names | continuous three-rail marquee, alternating direction |
| Cursor | eased custom follower, magnetic-target expansion |
| Reduced motion | animation disabled; every final state remains visible |

## Editable content contract

All event content is stored in `src/content.js`. The eventual video file belongs in `public/media/`, and its path is assigned to `videoSrc`.
