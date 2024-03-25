import headerIcon from "../../assets/header.png";

export function HeaderButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
  updateHistory,
}) {
  const applyHeader = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const textBeforeSelection = markdownText.substring(0, startPos);
    const indexOfLastNewLine = textBeforeSelection.lastIndexOf("\n");
    const startOfLine = indexOfLastNewLine === -1 ? 0 : indexOfLastNewLine + 1;

    const currentLineText = markdownText.substring(
      startOfLine,
      markdownText.indexOf("\n", startPos) === -1
        ? undefined
        : markdownText.indexOf("\n", startPos),
    );

    const headerMatch = currentLineText.match(/^(#{1,6})\s/);
    let newText;

    updateHistory(markdownText);

    if (headerMatch) {
      const currentHeaderLevel = headerMatch[1].length;
      const headerPrefix = "#".repeat((currentHeaderLevel % 6) + 1);

      newText =
        markdownText.substring(0, startOfLine) +
        headerPrefix +
        " " +
        currentLineText.substring(currentHeaderLevel + 1) +
        markdownText.substring(
          markdownText.indexOf("\n", startPos) === -1
            ? markdownText.length
            : markdownText.indexOf("\n", startPos),
        );
    } else {
      newText =
        markdownText.substring(0, startOfLine) +
        "### " +
        markdownText.substring(startOfLine);
    }

    updateHistory(newText);

    setMarkdownText(newText);
    textarea.focus();

    setTimeout(() => {
      const newCursorPos =
        newText.indexOf("\n", startOfLine) === -1
          ? newText.length
          : newText.indexOf("\n", startOfLine);
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      setCursorPosition(newCursorPos);
    }, 0);
  };

  return (
    <button
      onClick={applyHeader}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={headerIcon} alt="Header" className="h-5" />
    </button>
  );
}
