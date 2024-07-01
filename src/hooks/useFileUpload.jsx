import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFileNameStore from "../store/useFileName";
import useDocxXmlStore from "../store/useDocxXml";
import extractDocxData from "../utils/extractDocxData";

const useFileUpload = () => {
  const [labelText, setLabelText] = useState(
    "Choose a Word file or drag it here",
  );
  const [fileInfo, setFileInfo] = useState({ name: "", icon: "", file: null });
  const { setDocxXmlData, setDocxFilesData } = useDocxXmlStore();
  const { setFileName } = useFileNameStore();
  const navigate = useNavigate();

  useEffect(() => {
    setDocxFilesData("");
  }, [setDocxFilesData]);

  const handleConvert = async () => {
    if (fileInfo.file) {
      setFileName(fileInfo.name);
      try {
        const { xmlData, docxFilesData } = await extractDocxData(fileInfo.file);
        setDocxXmlData(xmlData);
        localStorage.setItem("docxXmlData", xmlData);

        setDocxFilesData(docxFilesData);

        navigate("/convert-markdown");
      } catch (error) {
        console.error("Error extracting XML from DOCX:", error);
      }
    }
  };

  return {
    labelText,
    fileInfo,
    setFileInfo,
    setLabelText,
    handleConvert,
  };
};

export default useFileUpload;
