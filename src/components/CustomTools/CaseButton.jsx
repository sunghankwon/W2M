import React from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";

export function CaseButton({
  editorRef,
  updateHistory,
  icon,
  transformCase,
  altText,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyCaseTransform = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    if (!selectedText) {
      return;
    }

    const scrollTop = textarea.scrollTop;

    updateHistory(markdownText);

    const transformedText = transformCase(selectedText);
    const newText =
      markdownText.substring(0, startPos) +
      transformedText +
      markdownText.substring(endPos);

    setMarkdownText(newText);

    const newCursorPos = startPos + transformedText.length;
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    textarea.scrollTop = scrollTop;
  };

  return (
    <button
      onClick={applyCaseTransform}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={icon} alt={altText} className="h-5" />
    </button>
  );
}
