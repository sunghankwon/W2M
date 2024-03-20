import underlineIcon from "../../assets/underline.png";

export function UnderlineButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyUnderLine = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `<u>${selectedText}</u>` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}<u></u>${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 3), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyUnderLine}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={underlineIcon} className="h-5"></img>
    </button>
  );
}
