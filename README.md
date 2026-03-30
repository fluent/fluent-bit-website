# Fluent Bit Website

This repository contains the Fluent Bit website built with [Hugo](https://gohugo.io/).

## Local development

Prerequisites:

- Install Hugo Extended

Quick start:

```bash
hugo server -D
```

This starts a local development server, usually at `http://localhost:1313`, and includes draft content.

Production build:

```bash
hugo
```

The generated site is written to `public/`.

## Repository structure

- `content/`: Markdown content for pages, blog posts, and announcements
- `layouts/`: Hugo templates and partials
- `assets/`: source styles and JavaScript
- `static/`: images and static files served as-is
- `data/`: structured site data used by templates

## Contributing blog posts

Blog posts live under `content/posts/`.

Guidelines:

- Create a new Markdown file with a descriptive kebab-case name
- Add front matter such as `title`, `date`, `description`, and any relevant image metadata
- Store referenced images in `static/images/` or the appropriate existing image directory
- Run `hugo server -D` locally and review the page before opening a PR

Example:

```bash
content/posts/my-new-post.md
```

## Contributing announcements and release notes

Release notes and announcements live under `content/announcements/`, grouped by major version.

Guidelines:

- Add new releases in the matching version directory, for example `content/announcements/v5.0/v5.0.1.md`
- Update any related release metadata in `config.toml` when the latest version changes
- Check the announcements index and release page locally before submitting a PR

## Deployment

Changes are automatically rendered and deployed through Cloudflare after a pull request is merged.

Recommended check before opening a PR:

```bash
hugo
```

## Publishing

This website is published with Cloudflare Pages.

Cloudflare Pages is linked directly to this GitHub repository, so merged changes are automatically built and published through the connected deployment pipeline.
