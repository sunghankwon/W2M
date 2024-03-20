import { useEffect, useState, useRef } from "react";

import MarkdownEditor from "../MarkdownEditor";
import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";
import useFileNameStore from "../../store/useFileName";
import printTextNodes from "../../utils/printTextNodes";

import copyIcon from "../../assets/copy.png";
import checkIcon from "../../assets/check.png";
import downloadIcon from "../../assets/download.png";

function MarkdownConvert() {
  const [markdownText, setMarkdownText] = useState("");
  const [originName, setOriginName] = useState("");
  const [buttonText, setButtonText] = useState("Copy code");
  const [iconSrc, setIconSrc] = useState(copyIcon);
  const { fileName } = useFileNameStore();
  const { docxXmlData, docxFilesData } = useDocxXmlStore();
  const previewRef = useRef(null);
  const editorRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    async function convertToMarkdown() {
      if (docxXmlData !== "") {
        const xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
        try {
          const markdown = await printTextNodes(
            xmlDoc.documentElement,
            docxFilesData,
          );

          setMarkdownText(markdown);
        } catch (error) {
          console.error("Error converting to markdown:", error);
        }
      }
    }

    setOriginName(
      fileName.substring(0, fileName.indexOf(".docx") || fileName.length),
    );
    convertToMarkdown();
  }, [docxXmlData, docxFilesData, fileName]);

  const handleEditorScroll = (event) => {
    if (isProgrammaticScroll.current) {
      return;
    }
    isProgrammaticScroll.current = true;

    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const previewScrollHeight =
      previewRef.current.scrollHeight - previewRef.current.clientHeight;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    previewRef.current.scrollTop = previewScrollHeight * scrollRatio;

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 10);
  };

  const handlePreviewScroll = (event) => {
    if (isProgrammaticScroll.current) {
      return;
    }
    isProgrammaticScroll.current = true;

    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const editorScrollHeight =
      editorRef.current.scrollHeight - editorRef.current.clientHeight;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    editorRef.current.scrollTop = editorScrollHeight * scrollRatio;

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 10);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(markdownText)
      .then(() => {
        setButtonText("Copied!");
        setIconSrc(checkIcon);

        setTimeout(() => {
          setButtonText("Copy code");
          setIconSrc(copyIcon);
        }, 2000);
      })
      .catch((error) => {
        console.error("Copy failed: ", error);
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
      <div className="flex items-start justify-center">
        <div className="flex flex-col mr-8">
          <h2 className="text-xl">{originName}.md</h2>
          <div className="flex justify-between w-[706px] bg-gray-300">
            <span className="flex items-center flex-grow ml-4">markdown</span>
            <div className="flex">
              <button
                onClick={downloadMarkdownFile}
                className="flex items-center p-2 mr-2 rounded-lg hover:bg-gray-400"
              >
                <img src={downloadIcon} className="h-5 mr-2"></img>
                Download
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center p-2 rounded-lg hover:bg-stone-600"
              >
                <img src={iconSrc} className="h-5 mr-2"></img>
                {buttonText}
              </button>
            </div>
          </div>

          <MarkdownEditor
            markdownText={markdownText}
            setMarkdownText={setMarkdownText}
            handleEditorScroll={handleEditorScroll}
            editorRef={editorRef}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">Preview</h2>
          <Preview
            markdownText={markdownText}
            ref={previewRef}
            handlePreviewScroll={handlePreviewScroll}
          />
        </div>
      </div>
    </>
  );
}

export default MarkdownConvert;
