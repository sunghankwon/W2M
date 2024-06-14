import { useEffect } from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";

export function PrefixTextButton({
  editorRef,
  setCursorPosition,
  updateHistory,
  icon,
  styleStart,
  shortcutKey,
  testId,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyStyle = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let formattedText = "";

    updateHistory(markdownText);

    if (selectedText) {
      const textArray = selectedText.split("\n");
      for (let text of textArray) {
        formattedText += `${styleStart}${text}\n`;
      }

      newText =
        markdownText.substring(0, startPos) +
        formattedText +
        markdownText.substring(endPos);
    } else {
      const beforeText = markdownText.substring(0, startPos);
      const afterText = markdownText.substring(startPos);
      const startOfLine = beforeText.lastIndexOf("\n") + 1;
      const endOfLine =
        afterText.indexOf("\n") === -1
          ? markdownText.length
          : startPos + afterText.indexOf("\n");
      const lineText = markdownText.substring(startOfLine, endOfLine);

      newText =
        markdownText.substring(0, startOfLine) +
        styleStart +
        lineText +
        markdownText.substring(endOfLine);

      const cursorPositionOffset = styleStart.length;
      setTimeout(
        () => setCursorPosition(startOfLine + cursorPositionOffset),
        0,
      );
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  const handleShortcuts = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === shortcutKey) {
      event.preventDefault();
      applyStyle();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);

    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [markdownText]);

  return (
    <button
      data-testid={testId}
      onClick={applyStyle}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={icon} alt={testId} className="h-5" />
    </button>
  );
}
