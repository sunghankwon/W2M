import { useEffect, useState } from "react";
import useDocxXmlStore from "../store/useDocxXml";
import useMarkdownTextStore from "../store/useMarkdownText";

const useImagePathsUpdater = () => {
  const { markdownText } = useMarkdownTextStore();
  const { docxFilesData } = useDocxXmlStore();
  const [processedMarkdown, setProcessedMarkdown] = useState(markdownText);

  useEffect(() => {
    const updateImagePaths = async () => {
      let updatedMarkdown = markdownText;

      const imagePaths = markdownText.match(/!\[.*?\]\((.*?)\)/g);
      if (imagePaths) {
        for (const fullPath of imagePaths) {
          const match = fullPath.match(/\((.*?)\)/);
          const imagePath = match[1];
          const isHttpUrl =
            imagePath.startsWith("http://") || imagePath.startsWith("https://");

          if (!isHttpUrl) {
            const filePath = imagePath.match(/(word\/media\/[^)]+)/)[0];
            if (docxFilesData[filePath]) {
              const blob = new Blob([docxFilesData[filePath]], {
                type: "image/png",
              });
              const url = URL.createObjectURL(blob);
              updatedMarkdown = updatedMarkdown.replace(imagePath, url);
            }
          }
        }
      }

      setProcessedMarkdown(updatedMarkdown);
    };

    updateImagePaths();
  }, [markdownText, docxFilesData]);

  return processedMarkdown;
};

export default useImagePathsUpdater;
