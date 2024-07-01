const processUploadedFile = (file, setFileInfo, setLabelText, docxImage) => {
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
