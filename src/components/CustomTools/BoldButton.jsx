import React from "react";
import boldIcon from "../../assets/Bold.png";

export function BoldButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyBold = () => {
    const textarea = editorRef.current;
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    const textBefore = markdownText.substring(0, startPos);
    const textAfter = markdownText.substring(endPos);
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    const hasBoldBefore = textBefore.endsWith("**");
    const hasBoldAfter = textAfter.startsWith("**");

    if (hasBoldBefore && hasBoldAfter && selectedText) {
      newText =
        markdownText.substring(0, startPos - 2) +
        selectedText +
        markdownText.substring(endPos + 2);
      startPos -= 2;
      endPos -= 2;
    } else if (!hasBoldBefore && !hasBoldAfter && selectedText) {
      if (
        selectedText.startsWith("**") &&
        selectedText.endsWith("**") &&
        selectedText.length > 4
      ) {
        const trimmedText = selectedText.substring(2, selectedText.length - 2);
        newText =
          markdownText.substring(0, startPos) +
          trimmedText +
          markdownText.substring(endPos);
      } else {
        newText =
          markdownText.substring(0, startPos) +
          `**${selectedText}**` +
          markdownText.substring(endPos);
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}****${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 2), 0);
    }

    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  return (
    <button
      onClick={applyBold}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={boldIcon} alt="Bold" className="h-5" />
    </button>
  );
}
