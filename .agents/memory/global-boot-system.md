---
name: Global boot behavior
description: Durable loading behavior for the ANONYMIKETECH global boot system.
---

The official boot MP4 is the primary initial-load gate. The app should reveal after the video completes, while large cinematic frame sequences report progress and continue loading in the background. Return visits use the short mini loader path.

**Why:** Waiting for all cinematic frames made first paint unnecessarily slow and kept the boot overlay visible after the primary boot sequence was complete.

**How to apply:** Keep the full boot video in the reusable loader components, use the configurable loader settings for timings/statuses, and do not replace the uploaded animation with a recreated CSS animation.