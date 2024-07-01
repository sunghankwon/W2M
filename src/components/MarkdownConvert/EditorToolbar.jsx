import CopyButton from "./CopyButton";
import DownloadButton from "./DownLoadButton";

const EditorToolbar = ({
  originName,
  markdownText,
  docxFilesData,
  buttonText,
  setButtonText,
  iconSrc,
  setIconSrc,
}) => (
  <div className="flex justify-between w-[706px] border rounded-t-md bg-gray-300 editor-toolbar">
    <span className="flex items-center flex-grow ml-4">markdown</span>
    <div className="flex">
      <DownloadButton
        originName={originName}
        markdownText={markdownText}
        docxFilesData={docxFilesData}
      />
      <CopyButton
        markdownText={markdownText}
        buttonText={buttonText}
        setButtonText={setButtonText}
        iconSrc={iconSrc}
        setIconSrc={setIconSrc}
      />
    </div>
  </div>
);

export default EditorToolbar;
