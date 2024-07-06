interface FileInfo {
  file: File | null;
}

interface FileConversionButtonsProps {
  handleConvert: () => void;
  fileInfo: FileInfo;
}

const FileConversionButtons = ({
  handleConvert,
  fileInfo,
}: FileConversionButtonsProps) => (
  <>
    <button
      className={`w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-2 sm:py-3 md:py-4 rounded text-white ${
        fileInfo.file
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-500 cursor-not-allowed"
      }`}
      onClick={handleConvert}
      disabled={!fileInfo.file}
    >
      Convert
    </button>
    <button
      className="relative mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-2 sm:py-3 md:py-4 rounded bg-green-600 text-white hover:bg-green-700"
      onClick={() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }
    >
      <div className="pt-20">
        <span className="absolute top-0 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb"></span>
        <span className="absolute top-4 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb delay-0.15s"></span>
        <span className="absolute top-8 left-1/2 w-6 h-6 ml-[-12px] border-l border-b border-gray-600 transform rotate-[-45deg] animate-sdb delay-0.3s"></span>
      </div>
    </button>
  </>
);

export default FileConversionButtons;
