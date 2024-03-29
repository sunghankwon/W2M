import useMarkdownTextStore from "../../store/useMarkdownText";
import lowercaseIcon from "../../assets/lowercase.png";

export function LowerCaseButton({ editorRef, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyLowercase = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    if (!selectedText) {
      return;
    }

    updateHistory(markdownText);

    const lowercaseText = selectedText.toLowerCase();
    const newText =
      markdownText.substring(0, startPos) +
      lowercaseText +
      markdownText.substring(endPos);

    updateHistory(newText);
    setMarkdownText(newText);

    const newCursorPos = startPos + lowercaseText.length;
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  };

  return (
    <button
      onClick={applyLowercase}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={lowercaseIcon} alt="Lowercase" className="h-5" />
    </button>
  );
}
