interface FileInfo {
  name: string;
  icon: string;
  file: File | null;
}

const clearSelection = (
  setFileInfo: (info: FileInfo) => void,
  setLabelText: (text: string) => void,
): void => {
  setFileInfo({ name: "", icon: "", file: null });
  setLabelText("Choose a Word file or drag it here");

  const fileInput = document.getElementById(
    "fileInput",
  ) as HTMLInputElement | null;
  if (fileInput) {
    fileInput.value = "";
  }
};

export default clearSelection;
