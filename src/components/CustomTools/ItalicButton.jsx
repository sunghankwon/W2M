import React, { useEffect } from "react";
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
    let selectedText = markdownText.substring(startPos, endPos);

    const leadingSpaces = selectedText.match(/^(\s*)/)[0];
    const trailingSpaces = selectedText.match(/(\s*)$/)[0];
    selectedText = selectedText.trim();

    let newText;
    const hasItalicBefore = textBefore.endsWith("_");
    const hasItalicAfter = textAfter.startsWith("_");

    if (hasItalicBefore && hasItalicAfter && selectedText) {
      newText =
        textBefore.slice(0, -1) +
        leadingSpaces +
        selectedText +
        trailingSpaces +
        textAfter.slice(1);
      const newCursorPos =
        startPos +
        leadingSpaces.length +
        selectedText.length +
        trailingSpaces.length -
        1;
      setTimeout(() => {
        setCursorPosition(newCursorPos);
      }, 0);
    } else if (!hasItalicBefore && !hasItalicAfter && selectedText) {
      if (
        selectedText.startsWith("_") &&
        selectedText.endsWith("_") &&
        selectedText.length > 2
      ) {
        const trimmedText = selectedText.substring(1, selectedText.length - 1);
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          trimmedText +
          trailingSpaces +
          markdownText.substring(endPos);
        setTimeout(() => setCursorPosition(startPos + trimmedText.length), 0);
      } else {
        newText =
          textBefore +
          leadingSpaces +
          `_${selectedText}_` +
          trailingSpaces +
          textAfter;
        setTimeout(
          () =>
            setCursorPosition(
              startPos +
                leadingSpaces.length +
                selectedText.length +
                2 +
                trailingSpaces.length,
            ),
          0,
        );
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}__${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + 1), 0);
    }

    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  const handleShortcuts = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "i") {
      event.preventDefault();
      applyItalic();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [markdownText]);

  return (
    <button
      onClick={applyItalic}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={italicIcon} alt="Italic" className="h-5" />
    </button>
  );
}
