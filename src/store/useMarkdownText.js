import { create } from "zustand";

const useMarkdownTextStore = create((set) => ({
  markdownText: "",
  setMarkdownText: (markdownText) => set({ markdownText }),
}));

export default useMarkdownTextStore;
