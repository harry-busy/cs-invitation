# IEEE Computer Society Core Reunion Invitation

An immersive, responsive reunion invitation for the former IEEE Computer Society core team. The experience combines a long-form animated story, Rive characters, scroll-linked motion, a personalized fold-open invitation card, and a final video message.

## Highlights

- Responsive experience for mobile, tablet, and desktop
- Scroll-driven story timeline with layered SVG scenery
- Lenis-powered smooth scrolling synchronized with the visual motion loop
- Nine animated Rive scenes
- Personalized invitations for all five former core members
- CSS 3D gatefold-card reveal with accessible reduced-motion behavior
- Shareable guest links using `?guest=Name#personal-invitation`
- Custom IEEE CS robot preloader and matching navigation mark
- Embedded reunion video with a locally generated poster
- Keyboard-friendly controls, visible focus states, and semantic landmarks

## Invited core team

- Aneesh K P
- Dheemanth G Athreya
- M B Prajwal
- Sneha N Shastri
- Tulasikrishna Tammina

## Tech stack

- [Vite](https://vite.dev/)
- Vanilla JavaScript and CSS
- [Rive Canvas Lite](https://rive.app/docs/runtimes/web/)
- [Lenis](https://lenis.dev/)
- Self-hosted Inter fonts

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

The development server prints the local preview URL in the terminal.

### Production build

```bash
npm run build
npm run preview
```

The optimized static site is generated in `dist/`.

## Personal invitation links

The standard invitation flow asks visitors to select their name. A card can also be opened directly with a shareable URL:

```text
/?guest=Aneesh%20K%20P#personal-invitation
```

The guest value must match one of the names configured in `src/content.js`.

## Editing event content

All frequently changed event details live in `src/content.js`:

- Event and chapter names
- Reunion date and venue
- Guest names
- Invitation copy
- Video and poster paths
- Footer credit and profile URL

The supplied reunion film is stored at `public/media/final-message.mp4`.

## Project structure

```text
src/
  content.js              Event data, names, and invitation copy
  main.js                 Page structure and interaction logic
  style.css               Layout, responsive design, and animation system
public/
  assets/rive/            Rive character animations
  assets/timeline/        Timeline SVG artwork
  fonts/                  Self-hosted web fonts
  media/                  Reunion video and poster
reference-assets-archive/ Captured reference archive and asset manifest
research/                 Visual and structural research notes
```

Additional implementation documentation is available in [`DESIGN-BLUEPRINT.md`](./DESIGN-BLUEPRINT.md) and [`ASSET-PROVENANCE.md`](./ASSET-PROVENANCE.md).

## Accessibility and performance

- Honors `prefers-reduced-motion`
- Uses native links and buttons for interactive controls
- Provides keyboard focus indicators and descriptive labels
- Loads the reunion video as metadata until playback is requested
- Uses local assets so the experience remains self-contained

## Credits

Designed and shipped by [Harry (Harshal Jain)](https://www.linkedin.com/in/harshal--gandhi/) for the IEEE Computer Society core team.

This is a private event project. No open-source license is granted unless one is added explicitly.
