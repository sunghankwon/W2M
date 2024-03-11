import { create } from "zustand";

const useFileNameStore = create((set) => ({
  fileName: "",
  setFileName: (data) => set({ fileName: data }),
}));

export default useFileNameStore;
