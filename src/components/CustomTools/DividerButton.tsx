import React, { MutableRefObject } from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";
import dividerLineIcon from "../../assets/line.png";

interface DividerButtonProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
}

export function DividerButton({
  editorRef,
  updateHistory,
}: DividerButtonProps): JSX.Element {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyDivider = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const divider = "---\n";

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}${divider}${markdownText.substring(startPos)}`;

    updateHistory(newText);
    setMarkdownText(newText);

    setTimeout(() => {
      const newCursorPos = startPos + divider.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  return (
    <button
      data-testid="dividerButton"
      onClick={applyDivider}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={dividerLineIcon} alt="Divider line" className="h-5" />
    </button>
  );
}
