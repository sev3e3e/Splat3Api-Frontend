import { atom } from "jotai";

export const currentGameModeAtom = atom("splatzones");
export const currentRegionAtom = atom<"atlantic" | "pacific">("pacific");
