import { create } from "zustand";

interface DocxXmlState {
  docxXmlData: string;
  docxFilesData: { [key: string]: string | Blob };
  setDocxXmlData: (docxXmlData: string) => void;
  setDocxFilesData: (docxFilesData: { [key: string]: string | Blob }) => void;
}

const useDocxXmlStore = create<DocxXmlState>((set) => ({
  docxXmlData: "",
  docxFilesData: {},
  setDocxXmlData: (docxXmlData: string) => set({ docxXmlData }),
  setDocxFilesData: (docxFilesData: { [key: string]: string | Blob }) =>
    set({ docxFilesData }),
}));

export default useDocxXmlStore;
