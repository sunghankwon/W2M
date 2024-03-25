import { forwardRef, useEffect, useState } from "react";
import { marked } from "marked";

import useMarkdownTextStore from "../../store/useMarkdownText";
import useDocxXmlStore from "../../store/useDocxXml";

const Preview = forwardRef(({ handlePreviewScroll }, ref) => {
  const { markdownText } = useMarkdownTextStore();
  const [processedMarkdown, setProcessedMarkdown] = useState(markdownText);
  const { docxFilesData } = useDocxXmlStore();

  useEffect(() => {
    const renderer = new marked.Renderer();

    renderer.image = function (href, title, text) {
      const isHttpUrl =
        href.startsWith("http://") || href.startsWith("https://");

      if (isHttpUrl) {
        return `<img src="${href}" alt="${text}" title="${title}" class="max-w-[96%] h-auto block mx-auto">`;
      } else {
        return `
          <div class="image-container text-center">
            <img src="${href}" alt="${text}" title="${title}" class="max-w-[96%] h-auto block mx-auto">
            <div class="text-xs text-gray-600">프리뷰를 위해 표시된 이미지입니다.</div>
          </div>
        `;
      }
    };

    marked.setOptions({
      renderer,
      breaks: true,
    });

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

  const getMarkdownText = () => {
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
