import useMarkdownTextStore from "../../store/useMarkdownText";
import taskIcon from "../../assets/task.png";

export function TaskButton({ editorRef, setCursorPosition, updateHistory }) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyTaskList = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let taskText = "";

    updateHistory(markdownText);

    if (selectedText) {
      const textArray = selectedText.split("\n");

      for (let text of textArray) {
        const headerMatch = text.match(/^(#+)(\s)?/);
        if (headerMatch) {
          taskText += `${text.substring(0, headerMatch[0].length)} - [ ] ${text.substring(headerMatch[0].length)}\n`;
        } else {
          taskText += `- [ ] ${text}\n`;
        }
      }

      newText =
        markdownText.substring(0, startPos) +
        taskText +
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
        newLineText = lineText.replace(
          headerMatch[0],
          `${headerMatch[0]}- [ ] `,
        );
      } else {
        newLineText = `- [ ] ${lineText}`;
      }

      newText =
        markdownText.substring(0, startOfLine) +
        newLineText +
        markdownText.substring(endOfLine);

      const cursorPositionOffset = headerMatch ? headerMatch[0].length + 6 : 6;
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
      onClick={applyTaskList}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={taskIcon} className="h-5"></img>
    </button>
  );
}
