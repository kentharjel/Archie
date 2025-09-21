import { useContext } from "react";
import { ArchContext } from "../contexts/ArchContext";

export function useArch() {
  const context = useContext(ArchContext);

  if (!context) {
    throw new Error("Outside the scope of the ArchProvider");
  }

  return context;
}
