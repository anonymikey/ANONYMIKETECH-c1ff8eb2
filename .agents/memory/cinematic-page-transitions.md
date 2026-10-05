---
name: Cinematic page transitions
description: Durable constraints for ANONYMIKETECH navigation transitions and scroll restoration.
---

The app currently uses a single-page Vite surface with hash navigation rather than a mounted router. The global PageTransition layer therefore observes internal links, history push/pop events, and router-compatible history changes while preserving hash scrolling and saved back/forward positions through a Lenis bridge.

**Why:** The transition experience must work now without adding routing infrastructure, but remain compatible if React Router is introduced later.

**How to apply:** Keep transition visuals GPU-driven with opacity/transform, use the existing GlobalLoader MiniLoader only for post-boot navigation, and preserve `history.scrollRestoration = "manual"` plus the `anonymiketech:scroll-to` event contract.