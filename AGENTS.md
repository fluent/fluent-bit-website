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

### Choose the source baseline and formatting template

- Check the website working tree and preserve unrelated changes. Inspect the target series under `content/announcements/<series>/`, both announcement indexes, and the latest-release settings in `config.toml`.
- In the Fluent Bit checkout at `/home/edsiper/c/fluent-bit`, verify the release tag and the previous tag in the same series. For a new series launch, use the previous released tag on its lineage. Review `git log --no-merges <previous>..<new>`, commit authors and sign-off trailers, and `git diff --stat` and `git diff --name-only` for that range. Use the supplied release date or the new tag's creator date.
- Choose the most recent announcement of the **same release type** as the formatting template. Prefer the target series when it has a matching announcement, and use the nearest earlier series otherwise. A maintenance release follows a recent maintenance announcement. A feature launch follows a recent feature launch.
- For v5.2.1, use v5.2.0 as the source comparison baseline and the [v5.1.5](content/announcements/v5.1/v5.1.5.md) and [v5.1.4](content/announcements/v5.1/v5.1.4.md) maintenance announcements as the formatting references. Apply this distinction to later releases too.

### Write the announcement

- Build the notes from the actual tagged delta. Scan the full release series for shipped capabilities that are easy to miss in a strict non-merge log, especially new formats, encoders, and input and output capabilities. Identify any earlier series features as upgrade context so readers can tell when they shipped.
- Start with the knowledge-base eyebrow, `## Release Notes vX.Y.Z`, the standard Fluent Bit introduction, and a concise release summary. Follow with `### What's new ?` and the established section order of `Core`, `Libraries` when applicable, and `Plugins`. Keep bundled dependency changes in `Libraries`.
- For maintenance releases, use the standard telemetry-agent hero description and place the link to the official Upgrading Notes after the introduction. Put individual changes under their sections. Group plugin entries under `Inputs`, `Processors & Filters`, and `Outputs` as applicable. Use bold plugin names linked to their official documentation when available, with indented bullets for the changes. Use the existing contributor shortcode and `Join us` footer. Feature launches may use standalone highlights where the launch template calls for them.
- Describe user-facing impact and keep reliability and security-sensitive changes high-level. If mentioning tests, summarize the areas covered. Verify any stated commit count against the comparison range and check documentation links.
- Build the contributor list from relevant commit authors, sign-off trailers, and pull request authors. Deduplicate identities, use names and GitHub profile links when available, and omit automation accounts.

### Update the website

- Add `content/announcements/<series>/vX.Y.Z.md` with `title`, `description`, `url`, `release_date`, `publishdate`, `ver`, `herobg`, and `latestVer`. Use the established `/announcements/vX.Y.Z/` URL and use the same release date for `release_date` and `publishdate`.
- When the release becomes the site-wide latest, set its `latestVer` to true and set the former latest announcement's flag to false. Update the featured content include in `content/announcements/_index.md` and set `lastVersion`, `releasedOn`, and `noteUrl` in `config.toml`. Follow the existing date format, such as `November 24, 2026` for `releasedOn`.
- Update `content/announcements/<series>/_index.md` when the release becomes the latest for that series. Point the content include and `releaseNotes.heading`, `releaseNotes.version`, and `releaseNotes.text` at the new release. Keep older announcements accessible through the archive.

### Validate and open the pull request

- Run `hugo` and `git diff --check`. In `hugo server -D`, compare the rendered announcement against the chosen formatting template on desktop and mobile. Check the hero and introduction, section order, nested plugin lists, and contributor and community sections. Verify the release date and links on the homepage, announcements index, series index, and standalone release page. Check that the prior release is still reachable.
- Use a `release:` commit subject and sign off each commit with `git commit -s`. Include the source tag comparison, validation results, and current desktop and mobile screenshots in the PR. Verify GitHub's DCO check after pushing.
