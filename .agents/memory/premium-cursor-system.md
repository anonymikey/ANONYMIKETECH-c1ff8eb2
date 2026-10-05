---
name: Premium cursor system
description: Durable constraints for the ANONYMIKETECH global cursor interaction layer.
---

The custom cursor is a global interaction layer with no third-party dependency. It uses one requestAnimationFrame loop, recycled particle nodes, delegated pointer classification, CSS transforms/opacity, and native-cursor fallbacks for touch, coarse pointers, and reduced-motion preferences.

**Why:** The cursor should add cinematic feedback without competing with the scroll-driven page or creating unnecessary React renders and DOM churn.

**How to apply:** Mount the reusable cursor at the app root, opt cards and SYNTH surfaces into the shared data/class selectors, and keep the Hero frame engine, cinematic scroll engine, loader, and existing layout independent from cursor state.