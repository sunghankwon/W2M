import capitalizeIcon from "../../assets/capitalize.png";

export function CapitalizeButton({ editorRef, markdownText, setMarkdownText }) {
  const applyCapitalizeWords = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    if (selectedText) {
      const capitalizedText = selectedText
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      newText =
        markdownText.substring(0, startPos) +
        capitalizedText +
        markdownText.substring(endPos);
    }

    setMarkdownText(newText);
  };

  return (
    <button
      onClick={applyCapitalizeWords}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={capitalizeIcon} className="h-5"></img>
    </button>
  );
}
