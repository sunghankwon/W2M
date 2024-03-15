import { useEffect, useState } from "react";

import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";
import useFileNameStore from "../../store/useFileName";
import printTextNodes from "../../utils/printTextNodes";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const [originName, setOriginName] = useState("");
  const { fileName } = useFileNameStore();
  const { docxXmlData, relationshipsData, numberingData } = useDocxXmlStore();

  useEffect(() => {
    setOriginName(fileName.substring(0, fileName.indexOf(".docx")));
    let xmlDoc;

    if (docxXmlData !== "") {
      xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
    } else {
      const localDocxXmlData = localStorage.getItem("docxXmlData");

      if (localDocxXmlData) {
        xmlDoc = new DOMParser().parseFromString(localDocxXmlData, "text/xml");
      }
    }
    const convertedMarkdown = printTextNodes(
      xmlDoc.documentElement,
      relationshipsData,
      numberingData,
    );

    setMarkdownText(convertedMarkdown);
  }, []);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(markdownText)
      .then(() => {
        alert("The text has been copied to the clipboard.");
      })
      .catch((error) => {
        console.error("The copy failed: ", error);
      });
  };

  const downloadMarkdownFile = () => {
    const element = document.createElement("a");
    const file = new Blob([markdownText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${originName}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="flex flex-col mr-8">
          <h2>{originName}.md</h2>
          <textarea
            value={markdownText}
            onChange={handleChange}
            rows="25"
            cols="80"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div className="mt-4">
            <button
              onClick={downloadMarkdownFile}
              className="border p-2 rounded-lg mr-2"
            >
              다운로드
            </button>
            <button onClick={copyToClipboard} className="border p-2 rounded-lg">
              복사
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Preview</h2>
          <Preview markdownText={markdownText} />
        </div>
      </div>
    </>
  );
}

export default MarkdownEditor;
