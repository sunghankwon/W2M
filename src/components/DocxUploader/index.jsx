import { useState } from "react";

import docxImage from "../../assets/docx.png";
import markdownImage from "../../assets/markdown.png";
import fileSearchIcon from "../../assets/file.png";

function DocxUploader() {
  const [labelText, setLabelText] = useState("choose Word file");
  const [fileInfo, setFileInfo] = useState({ name: "", icon: "" });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "docx") {
        setLabelText("Please insert a 'docx' file");
        setFileInfo({ name: "", icon: "" });
      } else {
        setLabelText("File ready to convert");
        setFileInfo({ name: file.name, icon: docxImage });
      }
    }
  };

  const clearSelection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFileInfo({ name: "", icon: "" });
    setLabelText("choose Word file");
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

  return (
    <>
      <div
        className="w-full max-w-none mt-10 mb-4 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="fileInput"
          className="w-11/12 flex justify-center items-center cursor-pointer"
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept=".docx"
          />
          <div
            className="w-full bg-gray-500 text-white flex flex-col items-center justify-center font-bold py-3 px-4 rounded-lg text-lg sm:text-xl md:text-2xl space-y-2 relative"
            style={{ minHeight: "200px" }}
          >
            {fileInfo.name ? (
              <div className="relative flex flex-col items-center justify-center pt-4">
                <img
                  src={fileInfo.icon}
                  alt="File icon"
                  className="w-24 h-24 sm:w-28 sm:h-28"
                />
                <span className="mt-2">{fileInfo.name}</span>
                <div
                  className="absolute top-0 right-0 cursor-pointer text-xl text-red-500 transform translate-y-1/2 translate-x-1/2"
                  onClick={clearSelection}
                >
                  &times;
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center pt-4">
                <img
                  src={fileSearchIcon}
                  alt="file search icon"
                  className="w-24 h-24 sm:w-28 sm:h-28 mb-2"
                />
              </div>
            )}
            <span>{labelText}</span>
          </div>
        </label>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 mb-4">
        <div className="flex justify-center items-center space-x-4 mb-4">
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
          className={`w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-10 py-3 px-6 rounded text-white ${fileInfo.name ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"}`}
          disabled={!fileInfo.name}
        >
          Convert
        </button>
      </div>
    </>
  );
}

export default DocxUploader;
