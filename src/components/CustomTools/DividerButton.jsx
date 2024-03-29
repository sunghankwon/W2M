import useMarkdownTextStore from "../../store/useMarkdownText";
import dividerLineIcon from "../../assets/line.png";

export function DividerButton({ editorRef, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyDivider = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const divider = "---\n";

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}${divider}${markdownText.substring(startPos)}`;

    updateHistory(newText);
    setMarkdownText(newText);

    setTimeout(() => {
      const newCursorPos = startPos + divider.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  return (
    <button
      onClick={applyDivider}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={dividerLineIcon} alt="Divider line" className="h-5" />
    </button>
  );
}
