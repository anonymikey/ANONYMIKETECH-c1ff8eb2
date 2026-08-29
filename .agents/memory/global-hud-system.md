---
name: Global HUD system
description: Durable constraints for the ANONYMIKETECH fixed telemetry overlay.
---

The HUD is mounted once inside the app shell immediately after the ambient layer. It is fixed, pointer-events-none, and uses a lower stacking level than navbar, sections, and footer so telemetry never blocks or competes with page content.

**Why:** The ambient engine and HUD are global visual systems, but the content remains the primary interface. The HUD must enrich the atmosphere without becoming an interactive or readability layer.

**How to apply:** Preserve compact mobile behavior, reduced-motion support, live clock updates, bounded simulated telemetry, section-aware scroll readouts, and transform/opacity-based animation. Keep the loader, cursor, and page-transition overlays in their existing higher global layers.