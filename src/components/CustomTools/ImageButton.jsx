import { useState } from "react";

import { InputModal } from "./InputModal";
import imageIcon from "../../assets/image.png";

export function ImageButton({ editorRef, markdownText, setMarkdownText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyImage = (url) => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    const newText = `${markdownText.substring(0, startPos)}![](${url})${markdownText.substring(startPos)}`;

    setMarkdownText(newText);
    textarea.focus();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 border rounded-lg hover:bg-gray-200"
      >
        <img src={imageIcon} className="h-5"></img>
      </button>
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={applyImage}
      />
    </>
  );
}
