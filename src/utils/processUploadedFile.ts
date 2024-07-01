interface FileInfo {
  name: string;
  icon: string;
  file: File;
}

const processUploadedFile = (
  file: File,
  setFileInfo: (info: FileInfo) => void,
  setLabelText: (text: string) => void,
  docxImage: string,
): void => {
  const reader = new FileReader();
  reader.onload = () => {
    setFileInfo({
      name: file.name,
      icon: docxImage,
      file,
    });
    setLabelText(file.name);
  };
  reader.readAsArrayBuffer(file);
};

export default processUploadedFile;
