import ConversionGuide from "../ConversionGuide";
import useFileUpload from "../../hooks/useFileUpload";
import FileInputLabel from "./FileInputLabel";
import FileConversionButtons from "./FileConversionButtons";
import docxImage from "../../assets/docx.png";
import markdownImage from "../../assets/markdown.png";
import processUploadedFile from "../../utils/processUploadedFile";

const DocxUploader = () => {
  const { labelText, fileInfo, setFileInfo, setLabelText, handleConvert } =
    useFileUpload();

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processUploadedFile(file, setFileInfo, setLabelText, docxImage);
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full mt-4 mb-4 max-w-none"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FileInputLabel
          fileInfo={fileInfo}
          labelText={labelText}
          setFileInfo={setFileInfo}
          setLabelText={setLabelText}
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-2 mb-4">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className="flex flex-col items-center">
            <img
              src={docxImage}
              alt="DOCX file"
              className="w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-52 md:h-52"
            />
            <span className="text-lg xs:text-xl sm:text-2xl">DOCX</span>
          </div>
          <span className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl">
            →
          </span>
          <div className="flex flex-col items-center">
            <img
              src={markdownImage}
              alt="Markdown file"
              className="w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-52 md:h-52"
            />
            <span className="text-lg xs:text-xl sm:text-2xl">MD</span>
          </div>
        </div>
        <FileConversionButtons
          handleConvert={handleConvert}
          fileInfo={fileInfo}
        />
      </div>
      <ConversionGuide />
    </>
  );
};

export default DocxUploader;
