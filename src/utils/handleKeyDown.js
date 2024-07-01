const handleKeyDown = (event, undo, redo) => {
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

export default handleKeyDown;
