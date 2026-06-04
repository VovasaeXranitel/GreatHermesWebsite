# Contributing

This repository is small by design.

## Local Checks

Preview the page locally before pushing:

```powershell
python -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Rules

- Keep the site static unless a build step becomes clearly useful.
- Keep text simple and readable.
- Avoid overloading the landing page with internal infrastructure details.
- Do not commit secrets or local deployment state.
