import { useState, MutableRefObject } from "react";
import { InputModal } from "./InputModal";
import useMarkdownTextStore from "../../store/useMarkdownText";

interface InsertButtonProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
  icon: string;
  placeholder: string;
  markdownSyntax: (url: string) => string;
}

export function InsertButton({
  editorRef,
  updateHistory,
  icon,
  placeholder,
  markdownSyntax,
}: InsertButtonProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { markdownText, setMarkdownText } = useMarkdownTextStore();

  const applyInsert = (url: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

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
