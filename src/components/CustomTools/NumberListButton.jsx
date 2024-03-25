import numberIcon from "../../assets/number.png";

export function NumberListButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyNumbering = () => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    let numberText = "";

    if (selectedText) {
      const textArray = selectedText.split("\n");
      let number = 0;
      for (let text of textArray) {
        number++;
        const headerMatch = text.match(/^(#+)(\s)?/);
        if (headerMatch) {
          numberText += `${text.substring(0, headerMatch[0].length)} ${number}. ${text.substring(headerMatch[0].length)}\n`;
        } else {
          numberText += `${number}. ${text}\n`;
        }
      }

      newText =
        markdownText.substring(0, startPos) +
        numberText +
        markdownText.substring(endPos);

      setTimeout(() => {
        setCursorPosition(startPos + numberText.length - 1); // 마지막 개행 문자 뒤에 커서를 위치시키기 위해 -1을 합니다.
      }, 0);
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
        newLineText = lineText.replace(headerMatch[0], `${headerMatch[0]}1. `);
      } else {
        newLineText = `1. ${lineText}`;
      }

      newText =
        markdownText.substring(0, startOfLine) +
        newLineText +
        markdownText.substring(endOfLine);

      const cursorPositionOffset = headerMatch ? headerMatch[0].length + 3 : 3;
      setTimeout(
        () => setCursorPosition(startOfLine + cursorPositionOffset),
        0,
      );
    }

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <button
      onClick={applyNumbering}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={numberIcon} className="h-5"></img>
    </button>
  );
}
