import { useEffect, useState } from "react";

import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";
import useFileNameStore from "../../store/useFileName";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const { fileName } = useFileNameStore();
  const { docxXmlData } = useDocxXmlStore();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
    setMarkdownText(convertedMarkdown);
  }, []);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const downloadMarkdownFile = () => {
    const originName = fileName.substring(0, fileName.indexOf(".docx"));
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
      <div className="flex">
        <h2>Markdown Editor</h2>
        <button onClick={downloadMarkdownFile} className="border">
          다운로드
        </button>
        <textarea
          value={markdownText}
          onChange={handleChange}
          rows="30"
          cols="80"
          className="w-[747px] p-2 mr-4 border border-gray-300 rounded-lg"
        />
        <h2>PreView</h2>
        <Preview />
      </div>
    </>
  );
}

export default MarkdownEditor;
