# Tadami GitHub Pages site

Static GitHub Pages site for `andarcanum/Tadami-Aniyomi-fork`.

## Files

- `index.html` - landing page
- `terms.html` - Terms of Service
- `privacy.html` - Privacy Policy
- `styles.css` - theme tokens, responsive layout, animations
- `script.js` - dark/light mode, nav, reveal animations, GitHub release metadata
- `assets/` - generated SVG and PNG visual assets
- `.nojekyll` - disables Jekyll processing on GitHub Pages

## Deploy to GitHub Pages

### Option A: existing project repository, `/docs` folder

1. Copy all files from this folder into `docs/` in `Tadami-Aniyomi-fork`.
2. Commit and push.
3. In GitHub: Settings -> Pages -> Build and deployment -> Deploy from a branch.
4. Select branch `main` and folder `/docs`.
5. Save. The site will be available at `https://andarcanum.github.io/Tadami-Aniyomi-fork/`.

### Option B: user site repository

1. Create or open `andarcanum.github.io`.
2. Copy these files to the repository root.
3. Commit and push.
4. GitHub Pages will serve the site from `https://andarcanum.github.io/`.

## Notes

The site is fully static and has no external runtime dependencies. It fetches public GitHub API metadata in the browser to keep release and star information fresh. If GitHub API access fails, the page falls back to the latest release data available when this package was generated.
