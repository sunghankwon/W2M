import underlineIcon from "../../assets/underline.png";

export function UnderlineButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyUnderLine = () => {
    const textarea = editorRef.current;
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    const textBefore = markdownText.substring(0, startPos);
    const textAfter = markdownText.substring(endPos);
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    const hasUnderLineBefore = textBefore.endsWith("<u>");
    const hasUnderLineAfter = textAfter.startsWith("</u>");

    if (hasUnderLineBefore && hasUnderLineAfter && selectedText) {
      newText =
        markdownText.substring(0, startPos - 3) +
        selectedText +
        markdownText.substring(endPos + 4);
      startPos -= 3;
      endPos -= 4;
    } else if (!hasUnderLineBefore && !hasUnderLineAfter && selectedText) {
      if (
        selectedText.startsWith("<u>") &&
        selectedText.endsWith("</u>") &&
        selectedText.length > 7
      ) {
        const trimmedText = selectedText.substring(3, selectedText.length - 4);
        newText =
          markdownText.substring(0, startPos) +
          trimmedText +
          markdownText.substring(endPos);
      } else {
        newText =
          markdownText.substring(0, startPos) +
          `<u>${selectedText}</u>` +
          markdownText.substring(endPos);
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}<u></u>${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 3), 0);
    }

    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  return (
    <button
      onClick={applyUnderLine}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={underlineIcon} className="h-5"></img>
    </button>
  );
}
