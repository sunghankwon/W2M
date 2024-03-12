import { useEffect, useState } from "react";

import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";
import useFileNameStore from "../../store/useFileName";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const [originName, setOriginName] = useState("");
  const { fileName } = useFileNameStore();
  const { docxXmlData } = useDocxXmlStore();

  useEffect(() => {
    let xmlDoc;

    if (docxXmlData !== "") {
      xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
    } else {
      const localDocxXmlData = localStorage.getItem("docxXmlData");

      if (localDocxXmlData) {
        xmlDoc = new DOMParser().parseFromString(localDocxXmlData, "text/xml");
      }
    }
    const convertedMarkdown = printTextNodes(xmlDoc.documentElement);
    setMarkdownText(convertedMarkdown);
    setOriginName(fileName.substring(0, fileName.indexOf(".docx")));
  }, []);

  const handleChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(markdownText)
      .then(() => {
        alert("텍스트가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("복사에 실패했습니다: ", err);
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

  const printTextNodes = (
    node,
    markdown = "",
    depth = 0,
    headingLevel = "",
    markdownSyntax = "",
  ) => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      const reverseSyntax = markdownSyntax
        .split("")
        .reverse()
        .join("")
        .replace(">u<", "</u>");
      markdown += `${headingLevel}${markdownSyntax}${node.textContent.trim()}${reverseSyntax}\n`;
    } else if (node.nodeType === 1) {
      let newHeadingLevel = headingLevel;
      let newMarkdownSyntax = markdownSyntax;

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
        const boldStyles = node.getElementsByTagName("w:b");

        for (let bold of boldStyles) {
          const styleId = bold.getAttribute("w:val");
          if (!newMarkdownSyntax.includes("**")) {
            switch (styleId) {
              case "1":
                newMarkdownSyntax += "**";
                break;
            }
          }
        }

        const italicStyles = node.getElementsByTagName("w:i");

        for (let italic of italicStyles) {
          const styleId = italic.getAttribute("w:val");
          if (!newMarkdownSyntax.includes("_")) {
            switch (styleId) {
              case "1":
                newMarkdownSyntax += "_";
                break;
            }
          }
        }

        const underLineStyles = node.getElementsByTagName("w:u");

        for (let underLine of underLineStyles) {
          const styleId = underLine.getAttribute("w:val");
          if (!newMarkdownSyntax.includes("<u>")) {
            switch (styleId) {
              case "single":
                newMarkdownSyntax += "<u>";
                break;
            }
          }
        }
      }

      Array.from(node.childNodes).forEach((child) => {
        markdown = printTextNodes(
          child,
          markdown,
          depth + 1,
          newHeadingLevel,
          newMarkdownSyntax,
        );
      });
    }

    return markdown;
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
