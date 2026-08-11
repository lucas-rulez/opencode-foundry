# Custom features

This file tracks changes that are specific to this OpenCode fork.

## TUI-001: Clickable response metadata

Status: in progress

Goal: allow TUI plugins to add clickable content beside assistant message metadata while preserving the native metadata.

Repositories: `opencode-foundry` and `opencode-message-actions`

Branches:

- `tui-link-api`: exposes the host-owned clickable `Link` component to TUI plugins.
- `message-metadata-slot`: adds the `message_metadata` slot with `session_id` and `message_id`.
- `message-links-demo`: planned plugin integration in `opencode-message-actions`.

Commits:

- `673c50be2a` `feat(plugin): expose clickable tui links`
- `917e73d6b2` `test(plugin): update tui api fixture`
- `c5d9a1bf0f` `feat(plugin): define message metadata slot`
- `b1398b268b` `feat(tui): render message metadata slot`
- `cb300c94bd` `test(tui): cover message metadata slot`
- `6831d437bd` `feat(tui): add clickable metadata demo`

Validation:

- `packages/plugin`: typecheck passes.
- `packages/tui`: typecheck passes.
- TUI plugin and slot tests pass.
- The repository-wide pre-push typecheck is currently blocked by an unrelated `packages/desktop` error caused by an empty generated `packages/app/node_modules/.ts-dist/src/index.d.ts`.

Next steps:

- Publish `message-metadata-slot` after the repository-wide typecheck issue is resolved.
- Open the stacked pull requests on the fork.
- Add the `message-links-demo` plugin.

## TUI-002: Clickable TUI actions

Status: in progress

Goal: let slot plugins execute local actions from inline TUI content without misusing URL links.

Contract:

- `message_metadata` remains responsible for placement and message identity.
- `ctx.Link` opens external URLs.
- `ctx.Action` executes a plugin callback through the host-owned mouse interaction.

Branch: `tui-action-api`

Commits:

- `feat(plugin): expose clickable tui actions`
- `test(tui): cover clickable tui actions`

Scope: this feature belongs to the OpenCode host. Business features such as favorites remain separate plugins.
