import unorderedIcon from "../../assets/unordered.png";

export function UnorderedListButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyUnorderedList = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let numberText = "";

    if (selectedText) {
      const textArray = selectedText.split("\n");
      for (let text of textArray) {
        numberText += `- ${text}\n`;
      }

      newText =
        markdownText.substring(0, startPos) +
        numberText +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}- ${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 2), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyUnorderedList}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={unorderedIcon} className="h-5"></img>
    </button>
  );
}
