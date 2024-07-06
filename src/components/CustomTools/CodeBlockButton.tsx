import { MutableRefObject } from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";
import codeIcon from "../../assets/code.png";

interface CodeBlockButtonProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  setCursorPosition: (pos: number) => void;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
}

export function CodeBlockButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}: CodeBlockButtonProps): JSX.Element {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyCodeBlock = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    updateHistory(markdownText);

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `\`\`\`\n${selectedText}\n\`\`\`` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}\`\`\`\n\n\`\`\`${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 4), 0);
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyCodeBlock}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={codeIcon} className="h-5" alt="Code block icon" />
    </button>
  );
}
