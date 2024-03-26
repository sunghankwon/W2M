import { create } from "zustand";

const useFullScreenStore = create((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
}));

export default useFullScreenStore;
