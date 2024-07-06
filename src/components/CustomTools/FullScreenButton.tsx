import useFullScreenStore from "../../store/useFullScreen";
import FullScreenIcon from "../../assets/fullscreen.png";

export function FullScreenButton(): JSX.Element {
  const { isFullScreen, setIsFullScreen } = useFullScreenStore();

  const applyFullScreen = () => {
    const editorContainer = document.querySelector(
      ".editor-container",
    ) as HTMLElement;
    const markdownPreview = document.querySelector(
      ".markdown-preview",
    ) as HTMLElement;
    const previewContainer = document.querySelector(
      ".preview-container",
    ) as HTMLElement;
    const textArea = document.querySelector(".editor-textarea") as HTMLElement;

    if (editorContainer && markdownPreview && previewContainer && textArea) {
      if (!isFullScreen) {
        editorContainer.style.position = "fixed";
        editorContainer.style.left = "0";
        editorContainer.style.top = "0";
        editorContainer.style.width = "50%";
        editorContainer.style.height = "100vh";
        editorContainer.style.zIndex = "1000";

        textArea.style.height = "90vh";

        previewContainer.style.position = "fixed";
        previewContainer.style.right = "0";
        previewContainer.style.top = "0";
        previewContainer.style.width = "50%";
        previewContainer.style.height = "100vh";

        markdownPreview.style.height = "100vh";

        setIsFullScreen(true);
      } else {
        editorContainer.style.position = "";
        editorContainer.style.width = "";
        editorContainer.style.height = "";
        textArea.style.height = "";

        previewContainer.style.position = "";
        previewContainer.style.width = "";
        previewContainer.style.height = "";
        markdownPreview.style.height = "";

        setIsFullScreen(false);
      }
    }
  };

  return (
    <button
      onClick={applyFullScreen}
      className="p-2 border rounded-lg hover:bg-gray-200"
    >
      <img src={FullScreenIcon} alt="fullScreen" className="h-5" />
    </button>
  );
}
