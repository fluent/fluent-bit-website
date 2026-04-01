# Repository Guidelines

## Project Structure & Module Organization
This repository is a Hugo website for fluentbit.io. Keep page content in `content/`, shared templates in `layouts/`, site data in `data/`, source styles and scripts in `assets/`, and static files such as images in `static/`. Generated output belongs in `public/` and Hugo’s cached pipeline artifacts belong in `resources/`; treat both as build products, not hand-edited source. Use `archetypes/default.md` as the starting point for new Markdown content.

## Build, Test, and Development Commands
Use Hugo directly; this repo does not define a `Makefile` or package-managed scripts.

- `hugo server -D` runs the site locally and includes draft content.
- `hugo` builds the production site into `public/`.
- `hugo --cleanDestinationDir` rebuilds from scratch and clears stale generated files in `public/`.

Run commands from the repository root.

## Coding Style & Naming Conventions
Use 2-space indentation in TOML, front matter, and template blocks to match the existing files. Keep Markdown content concise and use clear front matter fields such as `title`, `date`, `description`, and `images` when relevant. Name blog posts with descriptive kebab-case filenames such as `content/posts/fluent-bit-alerting-via-slack.md`. Keep release notes under the versioned announcement directories, for example `content/announcements/v5.0/`.

For styling changes, prefer editing files in `assets/scss/` instead of generated CSS. Reuse existing partials in `layouts/partials/` before adding new templates.

## Testing Guidelines
There is no automated test suite in this repository. Validation is primarily a successful Hugo build plus manual review in the local dev server. Before opening a PR, run `hugo` and check the affected pages in `hugo server -D` for broken links, missing images, menu regressions, and layout issues.

## Commit & Pull Request Guidelines
Recent history uses short prefixes such as `release:`, `feat:`, and `core:`. Follow that pattern and keep the subject imperative and specific, for example `feat: add OpenTelemetry landing page`. Pull requests should include a short summary, any linked issue or context, and screenshots for visible site changes. If you update release metadata, verify matching values in `config.toml`, announcement content, and any related data files.

## Release Announcement Workflow
When adding a new Fluent Bit release announcement:

- Inspect prior announcement files for the target series under `content/announcements/<series>/`.
- Inspect the Fluent Bit git repo at `/home/edsiper/c/fluent-bit` and compare the previous tag to the new tag.
- Build the announcement content from the actual release delta.
- Also scan the release series for user-facing features already present in the shipped version but easy to miss from a strict no-merges delta, especially new formats, encoders, and output/input plugin capabilities.
- Add the new announcement file under `content/announcements/<series>/vX.Y.Z.md`.
- Update `content/announcements/_index.md` so the main announcements page renders the newest announcement.
- Update `content/announcements/<series>/_index.md` so the series page metadata points at the newest announcement.
- Update `config.toml`: `lastVersion`, `releasedOn`, and `noteUrl`.
- Include contributors, using the contributor names and GitHub handles from the relevant commits and PR authors when available.

## Release Notes
- The site-wide latest version banner reads from `config.toml`.
- The main announcements landing page reads `content/announcements/_index.md`.
- The version-series landing page reads `content/announcements/<series>/_index.md`.
