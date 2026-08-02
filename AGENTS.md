# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

## Durable design decisions

- External-profile blocks should explain the visitor value before the outbound CTA. Avoid duplicating the same Instagram message on both sides of a card; show concrete content categories as proof instead.
- Never apply clipped, masked, or gradient-filled text effects to the hero display type: it must render as plain Inter text with fully visible glyph edges and punctuation at every breakpoint.
- The header mark is a compact, unified wordmark: its divider and endorsement line should feel intentionally aligned, never squeezed or improvised.
- The brand accent is Deep Mahogany from the supplied Pantone card (19-1306 TCX). Use the screen-adapted mahogany family (`#2d1215` / `#7d4746` / warm rose neutrals) for dark surfaces, accents, controls, gradients, focus and hover states; do not reintroduce eucalyptus green.
- Keep page-level light backgrounds to two intentional surfaces only: warm paper by default and a muted mahogany wash for diagnostic/evaluation moments. Cards may use a slightly lifted paper surface, but should not introduce additional section backgrounds.
- Horizontal service rails use direct drag interaction for mouse users; the vertical mouse wheel must remain reserved for page scrolling.
- On tablet and mobile, section containers must retain the same side rhythm; avoid full-bleed panels unless intentionally used for an image. Reduce fixed content heights so an action never leaves a large dead gap before the next visual.
- Mobile footer should present brand, navigation, visit details and legal/booking content as legible stacked groups, with at least 14px body links and an easy-to-hit booking CTA.
- In two-column tablet footers, legal links and the booking CTA must span the full row below navigation and visit details; do not leave a deliberate empty column.
- In two-column content grids, a final orphaned card must span the full row; do not leave a visually unfinished empty cell or missing divider.
- Journey step changes should use layered, gentle 0.6–1.35s transitions for the image, progress bar and expanding description rather than snapping between states.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.
