const clearSelection = (setFileInfo, setLabelText) => {
  setFileInfo({ name: "", icon: "", file: null });
  setLabelText("Choose a Word file or drag it here");
  document.getElementById("fileInput").value = "";
};

export default clearSelection;
