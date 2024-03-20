import boldIcon from "../../assets/Bold.png";

export function BoldButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyBold = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `**${selectedText}**` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}****${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 2), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyBold}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={boldIcon} className="h-5"></img>
    </button>
  );
}
