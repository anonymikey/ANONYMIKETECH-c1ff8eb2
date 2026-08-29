export const MAGNETIC_SELECTOR =
  'button, [role="button"], [data-cursor-magnet]';

export const CARD_SELECTOR =
  '[data-cursor-card], .card-surface, .synth-console';

export function closestElement(
  target: EventTarget | null,
  selector: string,
): HTMLElement | null {
  return target instanceof Element
    ? (target.closest(selector) as HTMLElement | null)
    : null;
}

export function cursorModeForTarget(target: EventTarget | null) {
  const synthTarget = closestElement(target, "[data-synth], .synth");
  if (synthTarget) return { mode: "synth" as const, element: synthTarget };

  const textTarget = closestElement(
    target,
    'input, textarea, [contenteditable="true"]',
  );
  if (textTarget) return { mode: "text" as const, element: textTarget };

  const imageTarget = closestElement(target, "img, [data-cursor-image]");
  if (imageTarget) return { mode: "image" as const, element: imageTarget };

  const cardTarget = closestElement(target, CARD_SELECTOR);
  if (cardTarget) return { mode: "card" as const, element: cardTarget };

  const linkTarget = closestElement(target, "a");
  if (linkTarget) return { mode: "link" as const, element: linkTarget };

  const magneticTarget = closestElement(target, MAGNETIC_SELECTOR);
  if (magneticTarget) {
    return { mode: "magnetic" as const, element: magneticTarget };
  }

  const iconTarget = closestElement(target, "[data-cursor-icon]");
  if (iconTarget) return { mode: "icon" as const, element: iconTarget };

  return { mode: "default" as const, element: null };
}

export function clearCardStyles(card: HTMLElement | null) {
  if (!card) return;
  card.classList.remove("cursor-reactive-card--active");
  card.style.removeProperty("--cursor-card-x");
  card.style.removeProperty("--cursor-card-y");
  card.style.removeProperty("--cursor-light-x");
  card.style.removeProperty("--cursor-light-y");
}

export function updateCardStyles(
  card: HTMLElement,
  clientX: number,
  clientY: number,
) {
  const rect = card.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  const tiltX = (0.5 - y) * 8;
  const tiltY = (x - 0.5) * 8;

  card.classList.add("cursor-reactive-card--active");
  card.style.setProperty("--cursor-card-x", `${tiltX.toFixed(2)}deg`);
  card.style.setProperty("--cursor-card-y", `${tiltY.toFixed(2)}deg`);
  card.style.setProperty("--cursor-light-x", `${(x * 100).toFixed(1)}%`);
  card.style.setProperty("--cursor-light-y", `${(y * 100).toFixed(1)}%`);
}