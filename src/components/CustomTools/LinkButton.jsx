import linkIcon from "../../assets/link.png";

export function LinkButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyLink = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `[](${selectedText})` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}[]()${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 1), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyLink}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={linkIcon} className="h-5"></img>
    </button>
  );
}
