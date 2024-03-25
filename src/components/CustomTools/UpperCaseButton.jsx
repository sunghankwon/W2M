import uppercaseIcon from "../../assets/uppercase.png";

export function UpperCaseButton({
  editorRef,
  markdownText,
  setMarkdownText,
  updateHistory,
}) {
  const applyUppercase = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    if (!selectedText) {
      return;
    }

    updateHistory(markdownText);

    const uppercaseText = selectedText.toUpperCase();
    const newText =
      markdownText.substring(0, startPos) +
      uppercaseText +
      markdownText.substring(endPos);

    updateHistory(newText);
    setMarkdownText(newText);

    const newCursorPos = startPos + uppercaseText.length;
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  };

  return (
    <button
      onClick={applyUppercase}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={uppercaseIcon} alt="Uppercase" className="h-5" />
    </button>
  );
}
