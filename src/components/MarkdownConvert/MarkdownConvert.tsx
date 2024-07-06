import { useRef, useState, UIEvent } from "react";
import { syncScroll } from "../../utils/syncScroll";
import useMarkdownConversion from "../../hooks/useMarkdownConversion";
import MarkdownEditor from "../MarkdownEditor";
import Preview from "../Preview";
import EditorToolbar from "./EditorToolbar";
import copyIcon from "../../assets/copy.png";

const MarkdownConvert: React.FC = () => {
  const [buttonText, setButtonText] = useState("Copy Markdown");
  const [iconSrc, setIconSrc] = useState(copyIcon);
  const { originName, markdownText, docxFilesData } = useMarkdownConversion();

  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);

  const handleEditorScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    if (isProgrammaticScroll.current) return;
    isProgrammaticScroll.current = true;
    syncScroll(editorRef, previewRef, isProgrammaticScroll);
  };

  const handlePreviewScroll = (event: UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) return;
    isProgrammaticScroll.current = true;
    syncScroll(previewRef, editorRef, isProgrammaticScroll);
  };

  return (
    <div className="flex items-start justify-center">
      <div className="flex flex-col mr-8 editor-container">
        <h2 className="text-xl">{originName}.md</h2>
        <EditorToolbar
          originName={originName}
          markdownText={markdownText}
          docxFilesData={docxFilesData}
          buttonText={buttonText}
          setButtonText={setButtonText}
          iconSrc={iconSrc}
          setIconSrc={setIconSrc}
        />
        <MarkdownEditor
          handleEditorScroll={handleEditorScroll}
          editorRef={editorRef}
          previewRef={previewRef}
          isProgrammaticScroll={isProgrammaticScroll}
        />
      </div>
      <div className="flex flex-col preview-container">
        <h2 className="text-xl">Preview</h2>
        <Preview ref={previewRef} handlePreviewScroll={handlePreviewScroll} />
      </div>
    </div>
  );
};

export default MarkdownConvert;
