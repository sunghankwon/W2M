interface FileInfo {
  name: string;
  icon: string;
  file: File | null;
}

const processFile = (
  file: File | null,
  setFileInfo: (info: FileInfo) => void,
  setLabelText: (text: string) => void,
  docxImage: string,
): void => {
  if (file) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
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
