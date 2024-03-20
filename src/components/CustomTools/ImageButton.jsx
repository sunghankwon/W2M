import imageIcon from "../../assets/image.png";

export function ImageButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyImage = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `![image](${selectedText})` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}![image]()${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 9), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyImage}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={imageIcon} className="h-5"></img>
    </button>
  );
}
