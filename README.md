# Vega LLC Website

Static marketing site for Vega LLC at `vegalending.com`.

## Local Preview

Run `python3 -m http.server 8772 --bind 127.0.0.1` and open `http://127.0.0.1:8772/`. No build step is required.

## Repository

```text
vega-llc/vegalending.com
```

## Deployment

GitHub Pages publishes the repository root from `main` through the generated "pages build and deployment" workflow. The `CNAME` file maps it to `vegalending.com`; `.nojekyll` preserves the plain static files.

Before publishing, run `git diff --check`, `node --check script.js`, and `xmllint --noout sitemap.xml`. Check responsive layouts, screenshot enlargement, and the interactive panels. Push the approved commit to `main`, confirm the matching Pages workflow succeeds, then verify the live page and its assets. A rollback is a new revert commit of the deployment commit, followed by the same checks and push.

## Content and assets

- Product order: DispatchDesk, AI-Term, BallisticTracker, ExpenseOnTheGo, PalmScan AI.
- Keep public development descriptions generic and do not expose private repository links.
- AI-Term uses the two user-selected September 2026 screenshots, unaltered. BallisticTracker and ExpenseOnTheGo use actual product captures.
- DispatchDesk's interactive panel is a labeled interface study, not a live model connection. PalmScan's hand image is a labeled generated concept, not a customer photograph or verified reading.
- Site typography uses Helvetica Neue with system fallbacks. Fonts within product screenshots remain unchanged.
- Contact email: `dev@vegalending.com`.
