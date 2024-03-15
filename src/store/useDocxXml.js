import { create } from "zustand";

const useDocxXmlStore = create((set) => ({
  docxXmlData: "",
  relationshipsData: "",
  numberingData: "",
  setDocxXmlData: (docxXmlData) => set({ docxXmlData }),
  setRelationshipsData: (relationshipsData) => set({ relationshipsData }),
  setNumberingData: (numberingData) => set({ numberingData }),
}));

export default useDocxXmlStore;
