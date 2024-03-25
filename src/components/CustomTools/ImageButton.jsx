import { useState } from "react";

import { InputModal } from "./InputModal";
import useMarkdownTextStore from "../../store/useMarkdownText";
import imageIcon from "../../assets/image.png";

export function ImageButton({ editorRef, updateHistory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyImage = (url) => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}![](${url})${markdownText.substring(startPos)}`;

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
