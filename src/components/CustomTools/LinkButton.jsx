import { useState } from "react";

import { InputModal } from "./InputModal";
import linkIcon from "../../assets/link.png";

export function LinkButton({
  editorRef,
  markdownText,
  setMarkdownText,
  updateHistory,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyLink = (url) => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}[](${url})${markdownText.substring(startPos)}`;

    updateHistory(newText);
    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 border rounded-lg hover:bg-gray-200"
      >
        <img src={linkIcon} className="h-5"></img>
      </button>
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={applyLink}
      />
    </>
  );
}
