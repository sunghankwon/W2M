import numberIcon from "../../assets/number.png";

export function NumberListButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyNumbering = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let numberText = "";

    if (selectedText) {
      const textArray = selectedText.split("\n");
      let number = 0;
      for (let text of textArray) {
        number++;
        numberText += `${number}. ${text}\n`;
      }

      newText =
        markdownText.substring(0, startPos) +
        numberText +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}1. ${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 3), 0);
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyNumbering}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={numberIcon} className="h-5"></img>
    </button>
  );
}
