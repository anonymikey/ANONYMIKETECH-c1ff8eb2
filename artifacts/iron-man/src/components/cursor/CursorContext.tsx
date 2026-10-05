import { createContext, useMemo, useState, type ReactNode } from "react";

export type CursorMode =
  | "default"
  | "magnetic"
  | "link"
  | "card"
  | "image"
  | "text"
  | "icon"
  | "synth";

type CursorContextValue = {
  mode: CursorMode;
  isVisible: boolean;
  isPointerDown: boolean;
  isScrolling: boolean;
  setMode: (mode: CursorMode) => void;
  setVisible: (visible: boolean) => void;
  setPointerDown: (down: boolean) => void;
  setScrolling: (scrolling: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setVisible] = useState(false);
  const [isPointerDown, setPointerDown] = useState(false);
  const [isScrolling, setScrolling] = useState(false);

  const value = useMemo(
    () => ({
      mode,
      isVisible,
      isPointerDown,
      isScrolling,
      setMode,
      setVisible,
      setPointerDown,
      setScrolling,
    }),
    [isPointerDown, isScrolling, isVisible, mode],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export { CursorContext };