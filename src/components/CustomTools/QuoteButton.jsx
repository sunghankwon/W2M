import useMarkdownTextStore from "../../store/useMarkdownText";
import quoteIcon from "../../assets/quote.png";

export function QuoteButton({ editorRef, setCursorPosition, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyQuote = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let quoteText = "";

    updateHistory(markdownText);

    if (selectedText) {
      const textArray = selectedText.split("\n");
      for (let text of textArray) {
        quoteText += `> ${text}\n`;
      }

      newText =
        markdownText.substring(0, startPos) +
        quoteText +
        markdownText.substring(endPos);

      setTimeout(() => {
        setCursorPosition(startPos + quoteText.length);
      }, 0);
    } else {
      newText = `${markdownText.substring(0, startPos)}> ${markdownText.substring(startPos)}`;

      setTimeout(() => setCursorPosition(startPos + 2), 0);
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      data-testid="quoteButton"
      onClick={applyQuote}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={quoteIcon} alt="Quote" className="h-5" />
    </button>
  );
}
