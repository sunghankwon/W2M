import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import MarkdownEditor from "../MarkdownEditor";
import Preview from "../Preview";
import useDocxXmlStore from "../../store/useDocxXml";
import useFileNameStore from "../../store/useFileName";
import useMarkdownTextStore from "../../store/useMarkdownText";
import printTextNodes from "../../utils/printTextNodes";
import transformQuotesInMarkdown from "../../utils/transformQuotesInMarkdown";

import copyIcon from "../../assets/copy.png";
import checkIcon from "../../assets/check.png";
import downloadIcon from "../../assets/download.png";

function MarkdownConvert() {
  const [originName, setOriginName] = useState("");
  const [buttonText, setButtonText] = useState("Copy code");
  const [iconSrc, setIconSrc] = useState(copyIcon);
  const { fileName } = useFileNameStore();
  const { docxXmlData, docxFilesData } = useDocxXmlStore();
  const { markdownText, setMarkdownText } = useMarkdownTextStore();
  const previewRef = useRef(null);
  const editorRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function convertToMarkdown() {
      if (docxXmlData !== "") {
        const xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
        try {
          let markdown = await printTextNodes(
            xmlDoc.documentElement,
            docxFilesData,
          );

          markdown = await transformQuotesInMarkdown(markdown);

          setMarkdownText(markdown);
          setOriginName(
            fileName.substring(
              0,
              fileName.lastIndexOf(".docx") > -1
                ? fileName.lastIndexOf(".docx")
                : fileName.length,
            ),
          );

          setIsDownloadTriggered(true);
        } catch (error) {
          console.error("Error converting to markdown:", error);
        }
      } else {
        navigate("/");
      }
    }
    convertToMarkdown();
  }, [docxXmlData, docxFilesData, fileName]);

  useEffect(() => {
    async function downloadAllFiles() {
      if (
        isDownloadTriggered &&
        markdownText &&
        Object.keys(docxFilesData).length > 0
      ) {
        const hasImages = Object.keys(docxFilesData).some((key) =>
          key.startsWith("word/media/"),
        );

        if (hasImages) {
          const zip = new JSZip();
          zip.file(`${originName}.md`, markdownText);
          Object.entries(docxFilesData).forEach(([key, value]) => {
            if (key.startsWith("word/media/")) {
              zip.file(key, value, { binary: true });
            }
          });

          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, `${originName}.zip`);
        } else {
          const blob = new Blob([markdownText], { type: "text/markdown" });
          saveAs(blob, `${originName}.md`);
        }

        setIsDownloadTriggered(false);
      }
    }

    if (isDownloadTriggered) {
      downloadAllFiles();
    }
  }, [isDownloadTriggered, markdownText, docxFilesData, originName]);

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

  const downloadMarkdownFile = async () => {
    const hasImages = Object.keys(docxFilesData).some((key) =>
      key.startsWith("word/media/"),
    );

    if (hasImages) {
      const zip = new JSZip();
      zip.file(`${originName}.md`, markdownText);
      Object.entries(docxFilesData).forEach(([key, value]) => {
        if (key.startsWith("word/media/")) {
          zip.file(key, value, { binary: true });
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${originName}.zip`);
    } else {
      const blob = new Blob([markdownText], { type: "text/markdown" });
      saveAs(blob, `${originName}.md`);
    }
  };

  return (
    <>
      <div className="flex items-start justify-center">
        <div className="flex flex-col mr-8 editor-container">
          <h2 className="text-xl">{originName}.md</h2>
          <div className="flex justify-between w-[706px] border rounded-t-md bg-gray-300 editor-toolbar">
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
            handleEditorScroll={handleEditorScroll}
            editorRef={editorRef}
            previewRef={previewRef}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">Preview</h2>
          <Preview ref={previewRef} handlePreviewScroll={handlePreviewScroll} />
        </div>
      </div>
    </>
  );
}

export default MarkdownConvert;
