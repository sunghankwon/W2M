const scrollToLastEditPosition = (editorRef, lastEditPositionRef) => {
  const textarea = editorRef.current;
  if (textarea) {
    textarea.scrollTop = lastEditPositionRef.current;
  }
};

export default scrollToLastEditPosition;
