import useMarkdownTextStore from "../../store/useMarkdownText";
import codeIcon from "../../assets/code.png";

export function CodeBlockButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyCodeBlock = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;

    updateHistory(markdownText);

    if (selectedText) {
      newText =
        markdownText.substring(0, startPos) +
        `\`\`\`\n${selectedText}\n\`\`\`` +
        markdownText.substring(endPos);
    } else {
      newText = `${markdownText.substring(0, startPos)}\`\`\`\n\n\`\`\`${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 4), 0);
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyCodeBlock}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={codeIcon} className="h-5"></img>
    </button>
  );
}
