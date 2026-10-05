import { useContext } from "react";
import { CursorContext } from "./CursorContext";

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used inside CursorProvider");
  }
  return context;
}