import { useEffect, useRef } from "react";

import { Toolbar } from "../CustomTools/Toolbar";
import useMarkdownTextStore from "../../store/useMarkdownText";

function MarkdownEditor({
  handleEditorScroll,
  editorRef,
  previewRef,
  isProgrammaticScroll,
}) {
  const { markdownText, setMarkdownText } = useMarkdownTextStore();
  const historyRef = useRef([markdownText]);
  const historyIndexRef = useRef(0);
  const lastEditPositionRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === "z" && !event.shiftKey) {
          event.preventDefault();
          undo();
        } else if (
          (event.key === "Z" && event.shiftKey) ||
          (event.key === "z" && event.shiftKey)
        ) {
          event.preventDefault();
          redo();
        }
      }
    };

    const textarea = editorRef.current;
    textarea.addEventListener("keydown", handleKeyDown);

    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateText = (newHistoryIndex) => {
    historyIndexRef.current = newHistoryIndex;
    const value = historyRef.current[newHistoryIndex];
    setMarkdownText(value);
    scrollToLastEditPosition();
  };

  const undo = () => {
    const newHistoryIndex = historyIndexRef.current - 1;
    if (newHistoryIndex < 0) return;
    updateText(newHistoryIndex);
  };

  const redo = () => {
    const maxIndex = historyRef.current.length - 1;
    const newHistoryIndex = historyIndexRef.current + 1;
    if (newHistoryIndex > maxIndex) return;
    updateText(newHistoryIndex);
  };

  const scrollToLastEditPosition = () => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.scrollTop = lastEditPositionRef.current;
    }
  };

  const handleChange = (event) => {
    isProgrammaticScroll.current = true;
    const newValue = event.target.value;
    const currentScrollTop = editorRef.current.scrollTop;

    setMarkdownText(newValue);

    setTimeout(() => {
      isProgrammaticScroll.current = false;
      if (!editorRef.current || !previewRef.current) return;

      editorRef.current.scrollTop = currentScrollTop;

      const { scrollTop, scrollHeight, clientHeight } = editorRef.current;
      const isWithinBottom10Percent =
        scrollTop + clientHeight >= scrollHeight * 0.9;

      if (isWithinBottom10Percent) {
        if (newValue.endsWith("\n")) {
          editorRef.current.scrollTop = editorRef.current.scrollTop + 20;
        }
        const previewScrollHeight =
          previewRef.current.scrollHeight -
          previewRef.current.clientHeight +
          20;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);
        previewRef.current.scrollTop = previewScrollHeight * scrollRatio;
      }
    }, 10);

    if (newValue.endsWith(" ") || newValue.endsWith("\n")) {
      const newHistoryIndex = historyIndexRef.current + 1;
      historyRef.current = historyRef.current.slice(0, newHistoryIndex);
      historyRef.current.push(newValue);
      historyIndexRef.current = newHistoryIndex;
      lastEditPositionRef.current = event.target.scrollTop;
    }
  };

  const updateHistory = (newText) => {
    const newHistoryIndex = historyIndexRef.current + 1;
    historyRef.current = historyRef.current.slice(0, newHistoryIndex);
    historyRef.current.push(newText);
    historyIndexRef.current = newHistoryIndex;
  };

  return (
    <>
      <Toolbar editorRef={editorRef} updateHistory={updateHistory} />
      <textarea
        value={markdownText}
        onChange={handleChange}
        onScroll={handleEditorScroll}
        ref={editorRef}
        rows="23"
        cols="80"
        className="p-2 mr-10 border border-gray-300 rounded-b-lg focus:border-gray-300 focus:outline-none editor-textarea"
      />
    </>
  );
}

export default MarkdownEditor;
