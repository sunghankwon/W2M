import { useEffect, MutableRefObject } from "react";
import useMarkdownTextStore from "../../store/useMarkdownText";

interface SurroundTextButtonProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  setCursorPosition: (pos: number) => void;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
  icon: string;
  styleStart: string;
  styleEnd: string;
  shortcutKey: string;
  testId: string;
}

export function SurroundTextButton({
  editorRef,
  setCursorPosition,
  updateHistory,
  icon,
  styleStart,
  styleEnd,
  shortcutKey,
  testId,
}: SurroundTextButtonProps): JSX.Element {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyStyle = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    const textBefore = markdownText.substring(0, startPos);
    const textAfter = markdownText.substring(endPos);
    let selectedText = markdownText.substring(startPos, endPos);

    const leadingSpaces = selectedText.match(/^(\s*)/)?.[0] ?? "";
    const trailingSpaces = selectedText.match(/(\s*)$/)?.[0] ?? "";
    selectedText = selectedText.trim();

    let newText;
    const hasStyleBefore = textBefore.endsWith(styleStart);
    const hasStyleAfter = textAfter.startsWith(styleEnd);

    updateHistory(markdownText);

    if (hasStyleBefore && hasStyleAfter && selectedText) {
      newText =
        textBefore.slice(0, -styleStart.length) +
        leadingSpaces +
        selectedText +
        trailingSpaces +
        textAfter.slice(styleEnd.length);
      startPos -= styleStart.length;
      endPos += styleEnd.length;
      const newCursorPos =
        startPos +
        leadingSpaces.length +
        selectedText.length +
        trailingSpaces.length -
        styleStart.length;
      setTimeout(() => {
        setCursorPosition(newCursorPos);
      }, 0);
    } else if (!hasStyleBefore && !hasStyleAfter && selectedText) {
      if (
        selectedText.startsWith(styleStart) &&
        selectedText.endsWith(styleEnd) &&
        selectedText.length > styleStart.length + styleEnd.length
      ) {
        const trimmedText = selectedText.substring(
          styleStart.length,
          selectedText.length - styleEnd.length,
        );
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          trimmedText +
          trailingSpaces +
          markdownText.substring(endPos);
        setTimeout(() => setCursorPosition(startPos + trimmedText.length), 0);
      } else {
        newText =
          markdownText.substring(0, startPos) +
          leadingSpaces +
          `${styleStart}${selectedText}${styleEnd}` +
          trailingSpaces +
          markdownText.substring(endPos);
        setTimeout(
          () =>
            setCursorPosition(
              startPos +
                leadingSpaces.length +
                selectedText.length +
                styleStart.length +
                styleEnd.length +
                trailingSpaces.length,
            ),
          0,
        );
      }
    } else {
      newText = `${markdownText.substring(0, startPos)}${styleStart}${styleEnd}${markdownText.substring(startPos)}`;
      setTimeout(() => setCursorPosition(startPos + styleStart.length), 0);
    }

    updateHistory(newText);

    setMarkdownText(newText);
    textarea.setSelectionRange(startPos, endPos);
    textarea.focus();
  };

  const handleShortcuts = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === shortcutKey) {
      event.preventDefault();
      applyStyle();
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
      data-testid={testId}
      onClick={applyStyle}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={icon} alt={testId} className="h-5" />
    </button>
  );
}
