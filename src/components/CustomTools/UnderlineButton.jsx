import { useEffect } from "react";

import useMarkdownTextStore from "../../store/useMarkdownText";
import underlineIcon from "../../assets/underline.png";

export function UnderlineButton({ editorRef, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyUnderLine = () => {
    const textarea = editorRef.current;
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    const textBefore = markdownText.substring(0, startPos);
    const textAfter = markdownText.substring(endPos);
    let selectedText = markdownText.substring(startPos, endPos);

    const leadingSpaces = selectedText.match(/^(\s*)/)[0];
    const trailingSpaces = selectedText.match(/(\s*)$/)[0];
    selectedText = selectedText.trim();

    let newText;
    const hasUnderLineBefore = textBefore.endsWith("<u>");
    const hasUnderLineAfter = textAfter.startsWith("</u>");

    updateHistory(markdownText);

    if (hasUnderLineBefore && hasUnderLineAfter && selectedText) {
      newText =
        textBefore.slice(0, -3) +
        leadingSpaces +
        selectedText +
        trailingSpaces +
        textAfter.slice(4);
      startPos -= 3;
      endPos =
        startPos +
        leadingSpaces.length +
        selectedText.length +
        trailingSpaces.length;
    } else if (!hasUnderLineBefore && !hasUnderLineAfter && selectedText) {
      if (
        selectedText.startsWith("<u>") &&
        selectedText.endsWith("</u>") &&
        selectedText.length > 7
      ) {
        const trimmedText = selectedText.substring(3, selectedText.length - 4);
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          trimmedText +
          trailingSpaces +
          markdownText.substring(endPos);
        endPos =
          startPos +
          leadingSpaces.length +
          trimmedText.length +
          trailingSpaces.length;
      } else {
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          `<u>${selectedText}</u>` +
          trailingSpaces +
          markdownText.substring(endPos);
        endPos =
          startPos +
          leadingSpaces.length +
          selectedText.length +
          7 +
          trailingSpaces.length;
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}<u></u>${markdownText.substring(startPos)}`;
      endPos = startPos + 3;
    }

    updateHistory(newText);
    setMarkdownText(newText);
    setTimeout(() => textarea.setSelectionRange(endPos, endPos), 0);
    textarea.focus();
  };

  const handleShortcuts = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "u") {
      event.preventDefault();
      applyUnderLine();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);

    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [applyUnderLine]);

  return (
    <button
      data-testid="underlineButton"
      onClick={applyUnderLine}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={underlineIcon} className="h-5"></img>
    </button>
  );
}
