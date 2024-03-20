import { forwardRef } from "react";
import { marked } from "marked";

const Preview = forwardRef(({ markdownText, handlePreviewScroll }, ref) => {
  const getMarkdownText = () => {
    marked.setOptions({
      breaks: true,
    });
    const rawMarkup = marked.parse(markdownText);
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
