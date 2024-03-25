import { useEffect } from "react";

import useMarkdownTextStore from "../../store/useMarkdownText";
import strikethroughIcon from "../../assets/strikethrough.png";

export function StrikethroughButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyStrikethrough = () => {
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

    const hasStrikethroughBefore = textBefore.endsWith("~~");
    const hasStrikethroughAfter = textAfter.startsWith("~~");

    updateHistory(markdownText);

    if (hasStrikethroughBefore && hasStrikethroughAfter && selectedText) {
      newText =
        textBefore.slice(0, -2) +
        leadingSpaces +
        selectedText +
        trailingSpaces +
        textAfter.slice(2);
      startPos -= 2;
      endPos += 2;
      const newCursorPos =
        startPos +
        leadingSpaces.length +
        selectedText.length +
        trailingSpaces.length -
        2;
      setTimeout(() => {
        setCursorPosition(newCursorPos);
      }, 0);
    } else if (
      !hasStrikethroughBefore &&
      !hasStrikethroughAfter &&
      selectedText
    ) {
      if (
        selectedText.startsWith("~~") &&
        selectedText.endsWith("~~") &&
        selectedText.length > 4
      ) {
        const trimmedText = selectedText.substring(2, selectedText.length - 2);
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          trimmedText +
          trailingSpaces +
          markdownText.substring(endPos);
        setTimeout(() => setCursorPosition(startPos + trimmedText.length), 0);
      } else {
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          `~~${selectedText}~~` +
          trailingSpaces +
          markdownText.substring(endPos);
        setTimeout(
          () =>
            setCursorPosition(
              startPos +
                leadingSpaces.length +
                selectedText.length +
                4 +
                trailingSpaces.length,
            ),
          0,
        );
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}~~~~${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 2), 0);
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  const handleShortcuts = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "d") {
      event.preventDefault();
      applyStrikethrough();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);

    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [applyStrikethrough]);

  return (
    <button
      onClick={applyStrikethrough}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={strikethroughIcon} className="h-5"></img>
    </button>
  );
}
