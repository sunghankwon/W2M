import { create } from "zustand";

const useDocxXmlStore = create((set) => ({
  docxXmlData: "",
  setDocxXmlData: (data) => set({ docxXmlData: data }),
}));

export default useDocxXmlStore;
