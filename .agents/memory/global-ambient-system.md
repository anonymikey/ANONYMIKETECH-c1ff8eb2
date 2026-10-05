---
name: Global ambient system
description: Durable constraints for the ANONYMIKETECH atmospheric background engine.
---

The ambient environment is a fixed, pointer-events-none layer mounted inside the app shell as its first child. Content must remain above it; global overlays such as the loader, premium cursor, and page transition overlay remain separate and higher in the stack.

**Why:** A fixed ambient element mounted beside a shell with an opaque background can be visually hidden, while broad shell child selectors can accidentally promote it above content.

**How to apply:** Keep the ambient system behind readable content with an explicit stacking boundary. Prefer transform and opacity for motion, keep noise at very low opacity, disable cursor/blur-heavy effects for coarse or constrained devices, and freeze animations for reduced-motion users.