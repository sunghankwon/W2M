const processFile = (file, setFileInfo, setLabelText, docxImage) => {
  if (file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "docx") {
      setLabelText("Please insert a 'docx' file");
      setFileInfo({ name: "", icon: "", file: null });
    } else {
      setLabelText("File ready to convert");
      setFileInfo({ name: file.name, icon: docxImage, file: file });
    }
  }
};

export default processFile;
