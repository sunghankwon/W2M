import useMarkdownTextStore from "../../store/useMarkdownText";
import tableIcon from "../../assets/table.png";

export function TableButton({ editorRef, setCursorPosition, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyTable = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    const table = `| title1 | title2 | title3 |\n| ---- | ---- | ---- |\n| 1 | 2 | 3 |\n| a | b | c |\n| i | ii | iii |\n`;

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}${table}${markdownText.substring(startPos)}`;

    setTimeout(() => {
      setCursorPosition(startPos + table.length);
    }, 0);

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyTable}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={tableIcon} alt="Table" className="h-5" />
    </button>
  );
}
