# Parachord personal design system (Mac + Android)

## Source of truth

The user's selected shadcn/ui preset is `b6W2kHjuVs`:
https://ui.shadcn.com/create?preset=b6W2kHjuVs

`design-system/shadcn-preset.json` contains the decoded configuration. These values were decoded using the official shadcn preset codec (`packages/registry/src/preset/preset.ts`), not inferred from screenshots.

- Style: **Rhea**
- Base color / UI theme: **neutral / neutral**
- Chart color: **purple** (this does not imply a purple primary UI accent)
- Body font: **DM Sans**; heading font: **Space Grotesk**
- Icon library: **Phosphor**
- Radius: **default**; menu accent: **subtle**; menu color: **default**

Preserve this exact preset across both repositories. Avoid introducing independent design decisions when the preset or native component conventions already answer them.

## Platform implementation

- **Mac:** Electron, React 19, existing `React.createElement` renderer, Tailwind v3 and CSS variables in `index.html`. Before installing shadcn components, establish a compatible JSX/TSX build path and inspect the changes with CLI `--dry-run` / `--diff`. Use Base UI as the preferred primitive for new shadcn components when compatible. Migrate shared styling incrementally; preserve the existing playback and renderer behavior.
- **Android:** Jetpack Compose / Material 3. Translate the exact design tokens into `ui/theme/{Color,Theme,Type,Shape}.kt`, and reproduce corresponding native components and interaction semantics. Do not attempt to run shadcn React components on Android.
- **Cross-platform:** Keep shared **semantic roles** (background, foreground, card, muted, border, primary, focus, destructive, etc.) and typography/shape decisions aligned. Derive color values from the generated shadcn preset output; do not hand-guess their values. Maintain sufficient contrast and native input/accessibility behavior.
- **Icons:** Phosphor is the desired UI icon language. Maintain recognizable service branding and platform-specific functional icons where required.

## UX acceptance criteria

1. Album artwork/title opens album details; artist names open artist details, consistently across screens.
2. Add-to-playlist is reachable from tracks, albums, search, player and queue, with quick playlist selection.
3. Add-to-queue provides discreet feedback, preserving the current queue and user intent.
4. Queue can be reordered flexibly (mouse on Mac; touch drag on Android) without accidental playback changes.
5. Playback/DRM, navigation history, offline behavior, accessibility, and library synchronization remain functional.
6. Session transfer Mac ↔ Android is a separate capability and requires empirical validation of queue/order/position preservation.

## Implementation phases

1. **Foundation (this branch):** pin identical preset metadata in both repos and document constraints.
2. **Mac theme:** establish renderer compatibility, generate preset tokens with the official CLI, integrate shared tokens; migrate one representative component.
3. **Android theme:** map generated tokens and the selected fonts/icons to native Compose styles; migrate the matching component.
4. **Component rollout:** player, track row, album/artist cards, menus, dialogs, playlist picker, queue and navigation.
5. **Local QA:** focused behavioral checks, platform builds, light/dark contrast, keyboard/touch accessibility, and visual comparison.

## Validation

Run the desktop repository's documented lint/typecheck/test/build commands locally, and the Android repository's `./gradlew :app:testDebugUnitTest` + an actual device build locally. Preserve upstream sync via the forks. Review changes and tests before merging to each fork's `main`.

**Status:** Configuration reference only. UI migration and platform QA are pending. GitHub Actions are intentionally not triggered by these branch-only commits.
