import { useState, ChangeEvent } from "react";

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (url: string) => void;
}

export function InputModal({
  isOpen,
  onClose,
  onConfirm,
}: InputModalProps): JSX.Element | null {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = () => {
    onConfirm(url);
    onClose();
    setUrl("");
  };

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="absolute top-[300px] mt-[-100px] w-[300px] p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">url을 입력해주세요.</div>
        <input
          type="text"
          placeholder="http://"
          value={url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            확인
          </button>
          <button
            onClick={() => {
              onClose();
              setUrl("");
            }}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
