import { ChangeEvent } from "react";
import processFile from "./processFile";
import docxImage from "../assets/docx.png";

interface FileInfo {
  name: string;
  icon: string;
  file: File | null;
}

const handleFileChange = (
  event: ChangeEvent<HTMLInputElement>,
  setFileInfo: (info: FileInfo) => void,
  setLabelText: (text: string) => void,
): void => {
  const file = event.target.files?.[0];
  if (file) {
    processFile(file, setFileInfo, setLabelText, docxImage);
  }
};

export default handleFileChange;
