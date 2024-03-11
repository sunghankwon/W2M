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
    const convertedMarkdown = printTextNodes(xmlDoc.documentElement);
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

  const printTextNodes = (
    node,
    markdown = "",
    depth = 0,
    headingLevel = "",
  ) => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      markdown += `${headingLevel}${node.textContent.trim()}\n`;
    } else if (node.nodeType === 1) {
      let newHeadingLevel = headingLevel;
      if (node.nodeName === "w:p") {
        markdown += "\n";
        const styles = node.getElementsByTagName("w:pStyle");
        for (let style of styles) {
          const styleId = style.getAttribute("w:val");
          switch (styleId) {
            case "Title":
            case "Heading1":
              newHeadingLevel = "# ";
              break;
            case "Subtitle":
            case "Heading2":
              newHeadingLevel = "## ";
              break;
            default:
              newHeadingLevel = "### ";
              break;
          }
        }
      }
      Array.from(node.childNodes).forEach((child) => {
        markdown = printTextNodes(child, markdown, depth + 1, newHeadingLevel);
      });
    }
    return markdown;
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
