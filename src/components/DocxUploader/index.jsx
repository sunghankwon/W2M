import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";

import ConversionGuide from "../ConversionGuide";
import useFileNameStore from "../../store/useFileName";
import useDocxXmlStore from "../../store/useDocxXml";
import docxImage from "../../assets/docx.png";
import markdownImage from "../../assets/markdown.png";
import fileSearchIcon from "../../assets/file.png";

function DocxUploader() {
  const [labelText, setLabelText] = useState("Choose Word file");
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
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "docx") {
        setLabelText("Please insert a 'docx' file");
        setFileInfo({ name: "", icon: "", file: null });
      } else {
        setLabelText("File ready to convert");
        setFileInfo({ name: file.name, icon: docxImage, file: file });
      }
    }
  };

  const clearSelection = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setFileInfo({ name: "", icon: "", file: null });
    setLabelText("Choose Word file");
    document.getElementById("fileInput").value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const handleConvert = async () => {
    if (fileInfo.file) {
      setFileName(fileInfo.name);
      try {
        const zip = await JSZip.loadAsync(fileInfo.file);
        console.log(zip);
        const xmlData = await zip.file("word/document.xml").async("string");
        setDocxXmlData(xmlData);
        localStorage.setItem("docxXmlData", xmlData);

        let docxFilesDataPromises = [];

        zip.forEach((relativePath, file) => {
          if (!file.dir) {
            let asyncType = "string";
            if (relativePath.startsWith("word/media/")) {
              asyncType = "blob";
            }
            docxFilesDataPromises.push(
              file.async(asyncType).then((content) => {
                return { key: relativePath, value: content };
              }),
            );
          }
        });

        let results = await Promise.all(docxFilesDataPromises);
        let docxFilesData = {};
        results.forEach(({ key, value }) => {
          docxFilesData[key] = value;
        });

        setDocxFilesData(docxFilesData);

        navigate("/convert-markdown");
      } catch (error) {
        console.error("Error extracting XML from DOCX:", error);
      }
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full mt-10 mb-4 max-w-none"
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

      <div className="flex flex-col items-center justify-center mt-10 mb-4">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className="flex flex-col items-center">
            <img
              src={docxImage}
              alt="DOCX file"
              className="w-48 h-48 sm:w-52 sm:h-52"
            />
            <span className="text-xl sm:text-2xl">DOCX</span>
          </div>
          <span className="text-6xl sm:text-7xl md:text-8xl">→</span>
          <div className="flex flex-col items-center">
            <img
              src={markdownImage}
              alt="Markdown file"
              className="w-48 h-48 sm:w-52 sm:h-52"
            />
            <span className="text-xl sm:text-2xl">MD</span>
          </div>
        </div>
        <button
          className={`w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-10 py-3 px-6 rounded text-white ${fileInfo.file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"}`}
          onClick={handleConvert}
          disabled={!fileInfo.file}
        >
          Convert
        </button>
      </div>
      <ConversionGuide />
    </>
  );
}

export default DocxUploader;
