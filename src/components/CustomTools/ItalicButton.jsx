import italicIcon from "../../assets/italic.png";

export function ItalicButton({
  editorRef,
  markdownText,
  setMarkdownText,
  setCursorPosition,
}) {
  const applyItalic = () => {
    const textarea = editorRef.current;
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    const textBefore = markdownText.substring(0, startPos);
    const textAfter = markdownText.substring(endPos);
    const selectedText = markdownText.substring(startPos, endPos);

    let newText;
    const hasItalicBefore = textBefore.endsWith("_");
    const hasItalicAfter = textAfter.startsWith("_");

    if (hasItalicBefore && hasItalicAfter && selectedText) {
      newText =
        markdownText.substring(0, startPos - 1) +
        selectedText +
        markdownText.substring(endPos + 1);
      startPos -= 1;
      endPos -= 1;
    } else if (!hasItalicBefore && !hasItalicAfter && selectedText) {
      if (
        selectedText.startsWith("_") &&
        selectedText.endsWith("_") &&
        selectedText.length > 2
      ) {
        const trimmedText = selectedText.substring(1, selectedText.length - 1);
        newText =
          markdownText.substring(0, startPos) +
          trimmedText +
          markdownText.substring(endPos);
      } else {
        newText =
          markdownText.substring(0, startPos) +
          `_${selectedText}_` +
          markdownText.substring(endPos);
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}__${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 1), 0);
    }

    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  return (
    <button
      onClick={applyItalic}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={italicIcon} className="h-5"></img>
    </button>
  );
}
