export const FRAME_COUNT = 169;

export const framePath = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  quote: string;
  speaker: string;
  film: string;
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "d1",
    show: 0.1,
    hide: 0.3,
    quote: "Ideas become impact when you build what comes next.",
    speaker: "ANONYMIKETECH",
    film: "AI SOLUTIONS",
  },
  {
    id: "d2",
    show: 0.35,
    hide: 0.55,
    quote: "Innovating the Future starts with one connected idea.",
    speaker: "ANONYMIKETECH",
    film: "WEB • CLOUD",
  },
  {
    id: "d3",
    show: 0.6,
    hide: 0.8,
    quote: "The future belongs to the systems we build today.",
    speaker: "ANONYMIKETECH",
    film: "INTERNET SOLUTIONS",
  },
];

export const HERO_TEXT_FADE_END = 0.08;
