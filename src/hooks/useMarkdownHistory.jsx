import { useRef } from "react";
import scrollToLastEditPosition from "../utils/scrollToLastEditPosition";

const useMarkdownHistory = (initialText, setMarkdownText, editorRef) => {
  const historyRef = useRef([initialText]);
  const historyIndexRef = useRef(0);
  const lastEditPositionRef = useRef(0);

  const updateText = (newHistoryIndex) => {
    historyIndexRef.current = newHistoryIndex;
    const value = historyRef.current[newHistoryIndex];
    setMarkdownText(value);
    scrollToLastEditPosition(editorRef, lastEditPositionRef);
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

  const updateHistory = (newText) => {
    const newHistoryIndex = historyIndexRef.current + 1;
    historyRef.current = historyRef.current.slice(0, newHistoryIndex);
    historyRef.current.push(newText);
    historyIndexRef.current = newHistoryIndex;
  };

  return {
    undo,
    redo,
    updateHistory,
    lastEditPositionRef,
  };
};

export default useMarkdownHistory;
