---
name: Command palette system
description: Durable constraints for the ANONYMIKETECH global command deck.
---

The command palette is a reusable global overlay mounted beside the app shell. It uses client-side indexed commands, existing hash anchors, and the browser history layer so selections flow through PageTransition rather than bypassing the platform navigation experience.

**Why:** The platform is currently a single-page Vite surface, so introducing a separate router or action system would create competing navigation behavior. The palette still needs to feel like a fast, keyboard-first command deck.

**How to apply:** Preserve Ctrl/Cmd+K and slash activation outside typing targets, focus the search input on open, keep arrow navigation and Enter execution, use Tab for completion, retain recent and pinned state locally, mark future-only actions disabled, and keep the overlay above HUD/ambient content without intercepting input when closed.