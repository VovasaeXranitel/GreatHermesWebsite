# Great Hermes Website

Public landing page for Great Hermes.

Great Hermes presents the idea of expanding AI agents beyond a desktop CLI:
from a tool inside a terminal to an assistant available through a PC, messenger,
phone, watch, and other everyday interfaces.

## Structure

```text
index.html    Static landing page
favicon.svg   Site icon
CNAME         Custom domain for GitHub Pages
```

The site is intentionally static. There is no build step and no runtime
dependency chain.

## Local Preview

From the repository root:

```powershell
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080
```

## Deployment

GitHub Pages deploys the repository root through `.github/workflows/pages.yml`.

Target domain:

```text
thegreathermes.us
```

If the domain is still pointed at Cloudflare Tunnel or another host, update DNS
before relying on GitHub Pages as the live production host.

## Editing Rules

- Keep the page lightweight and static unless there is a clear reason to add a build system.
- Keep copy clear and human-readable; avoid dense infrastructure details on the landing page.
- Do not commit secrets, tunnel credentials, or machine-specific files.
