import processFile from "./processFile";
import docxImage from "../assets/docx.png";

const handleFileChange = (event, setFileInfo, setLabelText) => {
  const file = event.target.files[0];
  processFile(file, setFileInfo, setLabelText, docxImage);
};

export default handleFileChange;
