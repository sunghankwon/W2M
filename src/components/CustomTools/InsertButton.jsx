import { useState } from "react";
import { InputModal } from "./InputModal";
import useMarkdownTextStore from "../../store/useMarkdownText";

export function InsertButton({
  editorRef,
  updateHistory,
  icon,
  placeholder,
  markdownSyntax,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyInsert = (url) => {
    const textarea = editorRef.current;
    const startPos = textarea.selectionStart;

    updateHistory(markdownText);

    const newText = `${markdownText.substring(0, startPos)}${markdownSyntax(url)}${markdownText.substring(startPos)}`;

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
        <img src={icon} alt={placeholder} className="h-5" />
      </button>
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={applyInsert}
      />
    </>
  );
}
