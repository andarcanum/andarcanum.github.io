# Tadami Website Design System

## Design intent

Polished open-source Android landing page with a Claude Design style workflow: define a small brand system first, then build a high-fidelity static prototype that can ship directly to GitHub Pages.

## Brand attributes

- Calm, cinematic, and readable.
- Aurora-glow visual language tied to the app direction.
- Editorial spacing with bento feature cards.
- No external fonts or CDNs.
- Light and dark themes using the same semantic tokens.

## Colors

Dark theme:
- Background: `#08111d`
- Surface: `rgba(16, 27, 40, .78)`
- Text: `#f5f8fb`
- Muted: `#a8b5c5`
- Accent blue: `#18a7ff`
- Accent violet: `#6d5cf6`
- Accent mint: `#68e0cf`

Light theme:
- Background: `#f7f2e8`
- Surface: `rgba(255, 252, 246, .78)`
- Text: `#111827`
- Muted: `#556172`

## Typography

System sans-serif stack for performance and compatibility. Large hero titles use tight letter spacing and short line length. Legal pages use the same system for consistency.

## Components

- Sticky glass header
- Theme toggle
- Responsive nav drawer
- Hero with interactive phone mockup
- Bento feature cards with pointer glow
- Release card with GitHub API fallback
- Legal article cards

## Motion

- Aurora gradient drift
- Scroll reveal
- Floating callouts
- Interactive media tab switching
- Hover lift and glow
- `prefers-reduced-motion` override included
