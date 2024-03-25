import { useEffect, useRef } from "react";

import { Toolbar } from "../CustomTools/Toolbar";
import useMarkdownTextStore from "../../store/useMarkdownText";

function MarkdownEditor({ handleEditorScroll, editorRef, previewRef }) {
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

  const undo = () => {
    const newHistoryIndex = historyIndexRef.current - 1;
    if (newHistoryIndex < 0) return;
    historyIndexRef.current = newHistoryIndex;
    const previousValue = historyRef.current[newHistoryIndex];
    setMarkdownText(previousValue);
    scrollToLastEditPosition();
  };

  const redo = () => {
    const maxIndex = historyRef.current.length - 1;
    const newHistoryIndex = historyIndexRef.current + 1;
    if (newHistoryIndex > maxIndex) return;
    historyIndexRef.current = newHistoryIndex;
    const nextValue = historyRef.current[newHistoryIndex];
    setMarkdownText(nextValue);
    scrollToLastEditPosition();
  };

  const scrollToLastEditPosition = () => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.scrollTop = lastEditPositionRef.current;
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setMarkdownText(newValue);

    setTimeout(() => {
      if (!editorRef.current || !previewRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = editorRef.current;
      const previewScrollHeight =
        previewRef.current.scrollHeight - previewRef.current.clientHeight + 10;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      previewRef.current.scrollTop = previewScrollHeight * scrollRatio;
    }, 2);

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
        className="p-2 mr-10 border border-gray-300 rounded-lg focus:border-gray-300 focus:outline-none"
      />
    </>
  );
}

export default MarkdownEditor;
