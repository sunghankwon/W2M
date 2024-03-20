import uppercaseIcon from "../../assets/uppercase.png";

export function UpperCaseButton({ editorRef, markdownText, setMarkdownText }) {
  const applyUppercase = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      const uppercaseText = selectedText.toUpperCase();

      newText =
        markdownText.substring(0, startPos) +
        uppercaseText +
        markdownText.substring(endPos);
    }

    setMarkdownText(newText);
  };

  return (
    <button
      onClick={applyUppercase}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={uppercaseIcon} className="h-5"></img>
    </button>
  );
}
