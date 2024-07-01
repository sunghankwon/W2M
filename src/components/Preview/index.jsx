import { forwardRef } from "react";
import useImagePathsUpdater from "../../hooks/useImagePathsUpdater";
import useFullScreenStore from "../../store/useFullScreen";
import getMarkdownRenderer from "../../utils/getMarkdownRenderer";
import getMarkdownText from "../../utils/getMarkdownText";

const Preview = forwardRef(({ handlePreviewScroll }, ref) => {
  const { isFullScreen } = useFullScreenStore();
  const processedMarkdown = useImagePathsUpdater();

  const renderer = getMarkdownRenderer();

  return (
    <div
      ref={ref}
      onScroll={handlePreviewScroll}
      className={`w-full max-w-[800px] min-w-[706px] h-auto min-h-[650px] border rounded-md overflow-y-auto scrollbar-hide pl-2 prose lg:prose-xs markdown-preview ${
        !isFullScreen ? "max-h-[650px]" : ""
      }`}
      dangerouslySetInnerHTML={getMarkdownText(processedMarkdown, renderer)}
    />
  );
});

Preview.displayName = "Preview";

export default Preview;
