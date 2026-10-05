# Security Policy

FDE from Scratch is a static site. It has no backend, no accounts and no database; learners' progress and notes are stored only in their own browser's `localStorage`. The included `server.js` is a local development server and is not meant for production.

## Supported versions

Only the latest version on the `main` branch (and the published GitHub Pages site) receives fixes.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report privately using [GitHub private vulnerability reporting](https://github.com/mchittineni/fde-from-scratch/security/advisories/new). Include:

- what the issue is and where (file, route or URL),
- how to reproduce it,
- the impact you expect.

You should get an acknowledgement within a few days. Once a fix is released, we're happy to credit you in the changelog unless you prefer to stay anonymous.

## Scope

In scope: cross-site scripting through content rendering, malicious or hijacked links in the Library, and issues in the development server's path handling.

Out of scope: problems on third-party sites the Library links to, and attacks that require an already-compromised browser.
