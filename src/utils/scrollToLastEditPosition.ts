import { RefObject, MutableRefObject } from "react";

const scrollToLastEditPosition = (
  editorRef: RefObject<HTMLTextAreaElement>,
  lastEditPositionRef: MutableRefObject<number>,
): void => {
  const textarea = editorRef.current;
  if (textarea) {
    textarea.scrollTop = lastEditPositionRef.current;
  }
};

export default scrollToLastEditPosition;
