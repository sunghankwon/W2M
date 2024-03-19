import { create } from "zustand";

const useDocxXmlStore = create((set) => ({
  docxXmlData: "",
  docxFilesData: "",
  setDocxXmlData: (docxXmlData) => set({ docxXmlData }),
  setDocxFilesData: (docxFilesData) => set({ docxFilesData }),
}));

export default useDocxXmlStore;
