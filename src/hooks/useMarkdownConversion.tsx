import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import useDocxXmlStore from "../store/useDocxXml";
import useFileNameStore from "../store/useFileName";
import useMarkdownTextStore from "../store/useMarkdownText";
import printTextNodes from "../utils/printTextNodes";
import transformQuotesInMarkdown from "../utils/transformQuotesInMarkdown";

interface DocxFilesData {
  [key: string]: string;
}

const useMarkdownConversion = () => {
  const [originName, setOriginName] = useState<string>("");
  const [isDownloadTriggered, setIsDownloadTriggered] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { fileName } = useFileNameStore();
  const { docxXmlData, docxFilesData } = useDocxXmlStore();
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  useEffect(() => {
    async function convertToMarkdown() {
      if (docxXmlData !== "") {
        const xmlDoc = new DOMParser().parseFromString(docxXmlData, "text/xml");
        try {
          let markdown = await printTextNodes(
            xmlDoc.documentElement,
            docxFilesData as DocxFilesData,
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
  }, [docxXmlData, docxFilesData, fileName, navigate, setMarkdownText]);

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

  return {
    originName,
    markdownText,
    docxFilesData,
    setIsDownloadTriggered,
  };
};

export default useMarkdownConversion;
