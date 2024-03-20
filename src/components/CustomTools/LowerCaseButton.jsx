import lowercaseIcon from "../../assets/lowercase.png";

export function LowerCaseButton({ editorRef, markdownText, setMarkdownText }) {
  const applylowercase = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      const uppercaseText = selectedText.toLowerCase();

      newText =
        markdownText.substring(0, startPos) +
        uppercaseText +
        markdownText.substring(endPos);
    }

    setMarkdownText(newText);
  };

  return (
    <button
      onClick={applylowercase}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={lowercaseIcon} className="h-5"></img>
    </button>
  );
}
