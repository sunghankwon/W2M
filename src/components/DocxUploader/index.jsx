import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConversionGuide from "../ConversionGuide";
import useFileNameStore from "../../store/useFileName";
import useDocxXmlStore from "../../store/useDocxXml";
import processFile from "../../utils/processFile";
import extractDocxData from "../../utils/extractDocxData";
import docxImage from "../../assets/docx.png";
import markdownImage from "../../assets/markdown.png";
import fileSearchIcon from "../../assets/file.png";

function DocxUploader() {
  const [labelText, setLabelText] = useState(
    "Choose a Word file or drag it here",
  );
  const [fileInfo, setFileInfo] = useState({ name: "", icon: "", file: null });
  const { setDocxXmlData, setDocxFilesData } = useDocxXmlStore();
  const { setFileName } = useFileNameStore();
  const navigate = useNavigate();

  useEffect(() => {
    setDocxFilesData("");
    setDocxFilesData("");
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file, setFileInfo, setLabelText, docxImage);
  };

  const clearSelection = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setFileInfo({ name: "", icon: "", file: null });
    setLabelText("Choose a Word file or drag it here");
    document.getElementById("fileInput").value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file, setFileInfo, setLabelText, docxImage);
  };

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

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full mt-4 mb-4 max-w-none"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-11/12 cursor-pointer"
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept=".docx"
          />
          <div
            className="relative flex flex-col items-center justify-center w-full px-4 py-3 space-y-2 text-lg font-bold text-white bg-gray-400 rounded-lg sm:text-xl md:text-2xl"
            style={{ minHeight: "200px" }}
          >
            {fileInfo.name ? (
              <>
                <img
                  src={fileInfo.icon}
                  alt="File icon"
                  className="w-24 h-24 sm:w-28 sm:h-28"
                />
                <span className="mt-2">{fileInfo.name}</span>
                <div
                  className="absolute top-0 right-0 mt-2 mr-2 text-xl text-red-500 cursor-pointer"
                  onClick={(event) => clearSelection(event)}
                >
                  &times;
                </div>
              </>
            ) : (
              <div className="relative flex flex-col items-center justify-center pt-4">
                <img
                  src={fileSearchIcon}
                  alt="File search icon"
                  className="w-24 h-24 mb-2 sm:w-28 sm:h-28"
                />
                <span>{labelText}</span>
              </div>
            )}
          </div>
        </label>
      </div>

      <div className="flex flex-col items-center justify-center mt-2 mb-4">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className="flex flex-col items-center">
            <img
              src={docxImage}
              alt="DOCX file"
              className="w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-52 md:h-52"
            />
            <span className="text-lg xs:text-xl sm:text-2xl">DOCX</span>
          </div>
          <span className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl">
            →
          </span>
          <div className="flex flex-col items-center">
            <img
              src={markdownImage}
              alt="Markdown file"
              className="w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-52 md:h-52"
            />
            <span className="text-lg xs:text-xl sm:text-2xl">MD</span>
          </div>
        </div>
        <button
          className={`w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-2 sm:py-3 md:py-4 rounded text-white ${fileInfo.file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"}`}
          onClick={handleConvert}
          disabled={!fileInfo.file}
        >
          Convert
        </button>
        <button
          className="relative mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-2 sm:py-3 md:py-4 rounded bg-green-600 text-white hover:bg-green-700"
          onClick={scrollToBottom}
        >
          <div className="pt-20">
            <span className="absolute top-0 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb"></span>
            <span className="absolute top-4 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb delay-0.15s"></span>
            <span className="absolute top-8 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb delay-0.3s"></span>
          </div>
        </button>
      </div>
      <ConversionGuide />
    </>
  );
}

export default DocxUploader;
