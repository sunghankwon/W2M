import dividerLineIcon from "../../assets/line.png";

export function DividerButton({ editorRef, markdownText, setMarkdownText }) {
  const applyDivider = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    const divider = "---\n";
    const newText = `${markdownText.substring(0, startPos)}${divider}${markdownText.substring(startPos)}`;
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
