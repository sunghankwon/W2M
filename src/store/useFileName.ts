import { create } from "zustand";

interface FileNameState {
  fileName: string;
  setFileName: (data: string) => void;
}

const useFileNameStore = create<FileNameState>((set) => ({
  fileName: "",
  setFileName: (data: string) => set({ fileName: data }),
}));

export default useFileNameStore;
