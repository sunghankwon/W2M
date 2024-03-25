import useMarkdownTextStore from "../../store/useMarkdownText";
import capitalizeIcon from "../../assets/capitalize.png";

export function CapitalizeButton({ editorRef, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyCapitalizeWords = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    if (!selectedText) {
      return;
    }

    let capitalizedText;
    let newText;

    updateHistory(markdownText);

    if (selectedText) {
      capitalizedText = selectedText
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

    updateHistory(newText);
    setMarkdownText(newText);

    const newCursorPos = startPos + capitalizedText.length;
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
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
