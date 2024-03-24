import dividerLineIcon from "../../assets/line.png";

export function DividerButton({ editorRef, markdownText, setMarkdownText }) {
  const applyDivider = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    const divider = "---\n";

    const newText = `${markdownText.substring(0, startPos)}${divider}${markdownText.substring(startPos)}`;

    setMarkdownText(newText);
  };

  return (
    <button
      onClick={applyDivider}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={dividerLineIcon} className="h-5"></img>
    </button>
  );
}
