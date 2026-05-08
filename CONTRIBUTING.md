# Contributing

Thanks for helping make this package better.

## Local Setup

```bash
npm install
npm run typecheck
npm test
npm run build
npm run test:browser
```

## Pull Request Checklist

- Keep public API changes typed and documented.
- Add tests for new behavior.
- Update `README.md` or `docs/` for user-facing changes.
- Run `npm run check` before opening a PR.

## Design Principles

- Prefer native browser image features before adding JavaScript.
- Keep dependencies rare and justified.
- Preserve layout stability by default.
- Respect accessibility and reduced-motion preferences.
- Keep advanced behavior available through hooks and render props.
