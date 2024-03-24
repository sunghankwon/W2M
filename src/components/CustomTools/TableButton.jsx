import tableIcon from "../../assets/table.png";

export function TableButton({ editorRef, markdownText, setMarkdownText }) {
  const applyTable = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    const table = `| title1 | title2 | title3 |\n| ---- | ---- | ---- |\n| 1 | 2 | 3 |\n| a | b | c |\n| i | ii | iii |`;

    const newText = `${markdownText.substring(0, startPos)}${table} ${markdownText.substring(startPos)}`;

    setTimeout(() => setCursorPosition(startPos + 3), 0);

    setMarkdownText(newText);
  };

  return (
    <button
      onClick={applyTable}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={tableIcon} className="h-5"></img>
    </button>
  );
}
