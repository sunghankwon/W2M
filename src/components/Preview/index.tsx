import { forwardRef, UIEvent, useEffect, useState } from "react";
import useImagePathsUpdater from "../../hooks/useImagePathsUpdater";
import useFullScreenStore from "../../store/useFullScreen";
import getMarkdownText from "../../utils/getMarkdownText";

interface PreviewProps {
  handlePreviewScroll: (event: UIEvent<HTMLDivElement>) => void;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ handlePreviewScroll }, ref) => {
    const { isFullScreen } = useFullScreenStore();
    const processedMarkdown = useImagePathsUpdater();
    const [htmlContent, setHtmlContent] = useState<{ __html: string }>({
      __html: "",
    });

    useEffect(() => {
      const processMarkdown = async () => {
        const content = await getMarkdownText(processedMarkdown);
        setHtmlContent(content);
      };

      processMarkdown();
    }, [processedMarkdown]);

    return (
      <div
        ref={ref}
        onScroll={handlePreviewScroll}
        className={`w-full max-w-[800px] min-w-[706px] h-auto min-h-[650px] border rounded-md overflow-y-auto scrollbar-hide pl-2 prose lg:prose-xs markdown-preview ${
          !isFullScreen ? "max-h-[650px]" : ""
        }`}
        dangerouslySetInnerHTML={htmlContent}
      />
    );
  },
);

Preview.displayName = "Preview";

export default Preview;
