# MindMarket Homepage - Visual and Motion Teardown

## Technology classification

The reference creates an apparent dimensional experience without WebGL or a GLB model. The homepage contains Rive canvases, inline SVG paths, layered SVG illustrations, GSAP/DrawSVG-style stroke control, a Lenis scrolling class, CSS transforms and parallax. No video element or WebGL canvas was present.

## Palette and type

- Ink: `#2c2e2a`
- Cream: `#f5f1e4`
- Green: `#8ed462`
- Coral: `#ff705d`
- Yellow: `#f5e211`
- Blue: `#349df3` (visually sampled from the supplied art)
- Pink: `#e9afff` (visually sampled from the supplied art)
- Typeface: Inter 400 and 500, locally served WOFF2.

## Motion inventory

- SVG draw-on preloader.
- Clipped hero-line rise and delayed subhead.
- Rive hero composition with sticky scroll scaling.
- Continuous SVG timeline stroke reveal mapped to scroll progress.
- Low-amplitude parallax on story art and cards.
- White content-card front separating from a colored back plate.
- Rive character loops placed at specific points along the path.
- Colored button wipe with opposing arrow travel.
- Full-viewport menu reveal and Rive character entrance.
- Alternating infinite rails.
- Eased custom cursor with interactive enlargement.

## Accessibility behavior reproduced

- One semantic H1, ordered H2/H3 hierarchy.
- Keyboard-operable navigation and menu.
- Visible focus rings.
- Decorative artwork omitted from the accessibility tree.
- Full `prefers-reduced-motion` fallback with all content left visible.
