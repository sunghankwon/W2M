import { create } from "zustand";

interface FileNameState {
  markdownText: string;
  setMarkdownText: (data: string) => void;
}

const useMarkdownTextStore = create<FileNameState>((set) => ({
  markdownText: "",
  setMarkdownText: (markdownText: string) => set({ markdownText }),
}));

export default useMarkdownTextStore;
