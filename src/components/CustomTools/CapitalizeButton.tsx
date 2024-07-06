import React from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";
import capitalizeIcon from "../../assets/capitalize.png";

interface CapitalizeButtonProps {
  editorRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
}

export function CapitalizeButton({
  editorRef,
  updateHistory,
}: CapitalizeButtonProps): JSX.Element {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyCapitalizeWords = () => {
    const textarea = editorRef.current;
    const startPos = textarea?.selectionStart ?? 0;
    const endPos = textarea?.selectionEnd ?? 0;
    const selectedText = markdownText.substring(startPos, endPos);

    if (!selectedText) {
      return;
    }

    const capitalizedText = selectedText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const newText =
      markdownText.substring(0, startPos) +
      capitalizedText +
      markdownText.substring(endPos);

    updateHistory(markdownText);
    setMarkdownText(newText);

    const newCursorPos = startPos + capitalizedText.length;
    textarea?.focus();
    textarea?.setSelectionRange(newCursorPos, newCursorPos);
  };

  return (
    <button
      onClick={applyCapitalizeWords}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={capitalizeIcon} alt="Capitalize" className="h-5" />
    </button>
  );
}
