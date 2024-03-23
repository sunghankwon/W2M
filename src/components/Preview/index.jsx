import { forwardRef, useEffect, useState } from "react";
import { marked } from "marked";

import useDocxXmlStore from "../../store/useDocxXml";

const Preview = forwardRef(({ markdownText, handlePreviewScroll }, ref) => {
  const [processedMarkdown, setProcessedMarkdown] = useState(markdownText);
  const { docxFilesData } = useDocxXmlStore();

  useEffect(() => {
    const updateImagePaths = async () => {
      let updatedMarkdown = markdownText;

      const imagePaths = markdownText.match(
        /!\[Image]\(\.\/(word\/media\/[^)]+)\)/g,
      );
      if (imagePaths) {
        for (const path of imagePaths) {
          const filePath = path.match(/\(\/?\.\/(word\/media\/[^)]+)\)/)[1];
          if (docxFilesData[filePath]) {
            const blob = new Blob([docxFilesData[filePath]], {
              type: "image/png",
            });
            const url = URL.createObjectURL(blob);
            updatedMarkdown = updatedMarkdown.replace(`./${filePath}`, url);
          }
        }
      }

      setProcessedMarkdown(updatedMarkdown);
    };

    updateImagePaths();
  }, [markdownText, docxFilesData]);

  const getMarkdownText = () => {
    marked.setOptions({
      breaks: true,
    });
    const rawMarkup = marked.parse(processedMarkdown);
    return { __html: rawMarkup };
  };

  return (
    <div
      ref={ref}
      onScroll={handlePreviewScroll}
      className="w-[706px] h-[650px] border rounded-md overflow-y-auto scrollbar-hide pl-2 markdown-preview prose lg:prose-xs"
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
});

export default Preview;
