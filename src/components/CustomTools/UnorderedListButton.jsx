import useMarkdownTextStore from "../../store/useMarkdownText";
import unorderedIcon from "../../assets/unordered.png";

export function UnorderedListButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyUnorderedList = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let unorderdText = "";

    updateHistory(markdownText);

    if (selectedText) {
      const textArray = selectedText.split("\n");

      for (let text of textArray) {
        const headerMatch = text.match(/^(#+)(\s)?/);
        if (headerMatch) {
          unorderdText += `${text.substring(0, headerMatch[0].length)} - ${text.substring(headerMatch[0].length)}\n`;
        } else {
          unorderdText += `- ${text}\n`;
        }
      }

      newText =
        markdownText.substring(0, startPos) +
        unorderdText +
        markdownText.substring(endPos);
    } else {
      const beforeText = markdownText.substring(0, startPos);
      const afterText = markdownText.substring(startPos);
      const startOfLine = beforeText.lastIndexOf("\n") + 1;
      const endOfLine =
        afterText.indexOf("\n") === -1
          ? markdownText.length
          : startPos + afterText.indexOf("\n");
      const lineText = markdownText.substring(startOfLine, endOfLine);

      const headerMatch = lineText.match(/^(#+\s?)/);
      let newLineText;
      if (headerMatch) {
        newLineText = lineText.replace(headerMatch[0], `${headerMatch[0]}- `);
      } else {
        newLineText = `- ${lineText}`;
      }

      newText =
        markdownText.substring(0, startOfLine) +
        newLineText +
        markdownText.substring(endOfLine);

      const cursorPositionOffset = headerMatch ? headerMatch[0].length + 2 : 2;
      setTimeout(
        () => setCursorPosition(startOfLine + cursorPositionOffset),
        0,
      );
    }

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      data-testid="unorderedListButton"
      onClick={applyUnorderedList}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={unorderedIcon} className="h-5"></img>
    </button>
  );
}
