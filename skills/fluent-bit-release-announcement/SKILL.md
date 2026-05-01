# Fluent Bit Release Announcement

Use this workflow when preparing a new Fluent Bit release announcement in this website repository.

## Inputs

- Website repository: the current Fluent Bit website checkout
- Fluent Bit source repository: a local checkout of `github.com/fluent/fluent-bit`
- New version: `vX.Y.Z`
- Previous version: normally the latest announcement in `content/announcements/<series>/`

## Workflow

1. Confirm the website worktree status with `git status --short`.
2. Inspect the previous announcement file, for example `content/announcements/v5.0/v5.0.3.md`, and preserve the local announcement style.
3. Identify the Fluent Bit source checkout. Prefer a sibling directory named `fluent-bit`; otherwise use the path supplied by the user.
4. Confirm the Fluent Bit tags exist:

   ```bash
   git -C <fluent-bit-repo> tag --list 'vX.Y.*' --sort=v:refname
   ```

5. Collect the release date from the new tag:

   ```bash
   git -C <fluent-bit-repo> show -s --format='%ad' --date=short vX.Y.Z
   ```

6. Inspect committed changes only. Ignore untracked local files in the Fluent Bit source checkout unless the user explicitly asks otherwise.

   ```bash
   git -C <fluent-bit-repo> log --oneline --no-merges vX.Y.PREV..vX.Y.Z
   git -C <fluent-bit-repo> diff --stat vX.Y.PREV..vX.Y.Z
   git -C <fluent-bit-repo> diff --name-only vX.Y.PREV..vX.Y.Z
   ```

7. Read the diffs for user-facing behavior. Group notes by outcome, not by tiny implementation detail. Prefer wording like "adds parser support for TCP ingestion" over "adds parser_name field".
8. Add `content/announcements/<series>/vX.Y.Z.md`.
9. Set only the new announcement to `latestVer: true`; update the previous latest announcement to `latestVer: false`.
10. Update `content/announcements/_index.md` to include the new announcement.
11. Update `content/announcements/<series>/_index.md` so `releaseNotes.heading`, `releaseNotes.version`, and text mention the new version.
12. Update `config.toml`:

   ```toml
   lastVersion = "vX.Y.Z"
   releasedOn = "Month D, YYYY"
   noteUrl = "announcements/vX.Y.Z"
   ```

13. Contributors should come from relevant commit authors and PR authors when available. Use GitHub links when the handle is known; otherwise use the display name from commits.
14. Run `hugo` from the website repository root and fix any build failures.
15. Review `git diff --check` and `git diff --stat`.

## Release Note Style

- Keep the opening short and user-facing.
- Use `Core` for engine, routing, libraries, and test infrastructure.
- Use `Plugins` for input, filter, and output changes.
- Describe the operational value: readiness checks, safer routing, metadata preservation, parser support, crash fixes, lower overhead.
- Avoid commit-log wording such as "change type from bool to string" unless the direct user-facing configuration impact matters.
- Include exact config keys in backticks when users need to recognize the setting.
