# Vega LLC Website

Static marketing site for Vega LLC at `vegalending.com`.

## Local Preview

Open `index.html` in a browser. No build step is required.

## Recommended Repository

Create a GitHub repository under the Vega LLC organization:

```text
vega-llc/vegalending.com
```

That name is explicit, easy to find later, and keeps the domain mapped to one source repository.

## Hosting Recommendation

Best default: keep the source in GitHub and deploy the static site through Cloudflare Pages if the domain is already managed in Cloudflare. That gives simple rollbacks, CDN caching, HTTPS, and future room for Workers or redirects.

Simplest option: use GitHub Pages directly from the `main` branch. The included `CNAME` file is already set to `vegalending.com`.

## Before Launch

- Contact email is `dev@vegalending.com`.
- Confirm whether `vegalending.com` is the intended long-term domain, since the name can read as lending rather than software.
- Add the required DNS records from the selected host.
