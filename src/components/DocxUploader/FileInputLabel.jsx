import fileSearchIcon from "../../assets/file.png";
import docxImage from "../../assets/docx.png";
import processUploadedFile from "../../utils/processUploadedFile";
import clearSelection from "../../utils/clearSelection";

const FileInputLabel = ({ fileInfo, labelText, setFileInfo, setLabelText }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processUploadedFile(file, setFileInfo, setLabelText, docxImage);
  };

  return (
    <label
      htmlFor="fileInput"
      className="flex items-center justify-center w-11/12 cursor-pointer"
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
        accept=".docx"
      />
      <div
        className="relative flex flex-col items-center justify-center w-full px-4 py-3 space-y-2 text-lg font-bold text-white bg-gray-400 rounded-lg sm:text-xl md:text-2xl"
        style={{ minHeight: "200px" }}
      >
        {fileInfo.name ? (
          <>
            <img
              src={fileInfo.icon}
              alt="File icon"
              className="w-24 h-24 sm:w-28 sm:h-28"
            />
            <span className="mt-2">{fileInfo.name}</span>
            <div
              className="absolute top-0 right-0 mt-2 mr-2 text-xl text-red-500 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                clearSelection(setFileInfo, setLabelText);
              }}
            >
              &times;
            </div>
          </>
        ) : (
          <div className="relative flex flex-col items-center justify-center pt-4">
            <img
              src={fileSearchIcon}
              alt="File search icon"
              className="w-24 h-24 mb-2 sm:w-28 sm:h-28"
            />
            <span>{labelText}</span>
          </div>
        )}
      </div>
    </label>
  );
};

export default FileInputLabel;
