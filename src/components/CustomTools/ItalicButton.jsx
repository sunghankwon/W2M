import italicIcon from "../../assets/italic.png";

export function ItalicButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyItalic = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `_${selectedText}_` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}__${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 1), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyItalic}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={italicIcon} className="h-5"></img>
    </button>
  );
}
