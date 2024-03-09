import { useState } from "react";

import w2mLogo from "./assets/w2mLogo.png";
import docxImage from "./assets/docx.png";
import markdownImage from "./assets/markdown.png";
import fileSearchIcon from "./assets/file.png";

function App() {
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center mt-8 mb-10">
        <img src={w2mLogo} alt="W2M Logo" className="w-20 h-20 mr-6" />
        <h1 className="text-7xl font-bold">W2M</h1>
      </div>

      <div
        className="w-11/12 mt-15 mb-4 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="fileInput"
          className="w-full flex justify-center items-center cursor-pointer"
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept=".docx"
          />
          <div
            className="w-full bg-gray-500 text-white flex flex-col items-center font-bold py-2 px-4 rounded-lg text-lg space-y-2 relative"
            style={{ minHeight: "200px" }}
          >
            {fileInfo.name ? (
              <div className="relative flex flex-col items-center pt-4">
                <img
                  src={fileInfo.icon}
                  alt="File icon"
                  className="w-20 h-20"
                />
                <span className="mt-2">{fileInfo.name}</span>
              </div>
            ) : (
              <div className="relative flex flex-col items-center pt-4">
                <img
                  src={fileSearchIcon}
                  alt="file search icon"
                  className="w-20 h-20 mb-2"
                />
              </div>
            )}
            <span>{labelText}</span>
          </div>
        </label>
      </div>

      <div className="flex flex-col items-center mt-10 mb-4">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <img src={docxImage} alt="DOCX file" className="w-40 h-40" />
            <span className="text-xl">DOCX</span>
          </div>
          <span className="text-6xl">→</span>
          <div className="flex flex-col items-center">
            <img
              src={markdownImage}
              alt="Markdown file"
              className="w-40 h-40"
            />
            <span className="text-xl">MD</span>
          </div>
        </div>
        <button
          className={`w-full text-4xl font-bold mt-10 py-2 px-4 rounded text-white ${fileInfo.name ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!fileInfo.name}
        >
          convert
        </button>
      </div>
    </div>
  );
}

export default App;
