import { create } from "zustand";

/** Lets the homepage hero video (deep inside the tree) tell the root-level
 *  LoadingScreen it has a frame ready to paint, so the splash can clear. */
interface VideoReadyState {
  ready: boolean;
  setReady: () => void;
  reset: () => void;
}

export const useVideoReadyStore = create<VideoReadyState>((set) => ({
  ready: false,
  setReady: () => set({ ready: true }),
  reset: () => set({ ready: false }),
}));
