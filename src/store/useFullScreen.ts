import { create } from "zustand";

interface FullScreenState {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

const useFullScreenStore = create<FullScreenState>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),
}));

export default useFullScreenStore;
