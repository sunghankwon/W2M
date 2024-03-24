import headerIcon from "../../assets/header.png";

export function HeaderButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyHeader = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const textBeforeSelection = markdownText.substring(0, startPos);

    const indexOfLastNewLine = textBeforeSelection.lastIndexOf("\n");
    const startOfLine = indexOfLastNewLine === -1 ? 0 : indexOfLastNewLine + 1;

    const newText =
      markdownText.substring(0, startOfLine) +
      `### ` +
      markdownText.substring(startOfLine);

    setMarkdownText(newText);
    textarea.focus();

    const newCursorPos = startOfLine + 4;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    setCursorPosition(newCursorPos);
  };

  return (
    <button
      onClick={applyHeader}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={headerIcon} className="h-5"></img>
    </button>
  );
}
