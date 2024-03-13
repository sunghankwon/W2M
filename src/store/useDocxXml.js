import { create } from "zustand";

const useDocxXmlStore = create((set) => ({
  docxXmlData: "",
  relationshipsData: "",
  setDocxXmlData: (data) => set({ docxXmlData: data }),
  setRelationshipsData: (data) => set({ relationshipsData: data }),
}));

export default useDocxXmlStore;
