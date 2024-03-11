import { useEffect, useState } from "react";

import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const { docxXmlData } = useDocxXmlStore();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
    setMarkdownText(convertedMarkdown);
  }, []);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  return (
    <>
      <div className="flex">
        <h2>Markdown Editor</h2>
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
