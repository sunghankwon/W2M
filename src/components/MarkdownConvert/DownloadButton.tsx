import JSZip from "jszip";
import { saveAs } from "file-saver";
import downloadIcon from "../../assets/download.png";

interface DownloadButtonProps {
  originName: string;
  markdownText: string;
  docxFilesData: Record<string, string>;
}

const DownloadButton = ({
  originName,
  markdownText,
  docxFilesData,
}: DownloadButtonProps) => {
  const downloadMarkdownFile = async () => {
    const hasImages = Object.keys(docxFilesData).some((key) =>
      key.startsWith("word/media/"),
    );

    if (hasImages) {
      const zip = new JSZip();
      zip.file(`${originName}.md`, markdownText);
      Object.entries(docxFilesData).forEach(([key, value]) => {
        if (key.startsWith("word/media/")) {
          zip.file(key, value, { binary: true });
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${originName}.zip`);
    } else {
      const blob = new Blob([markdownText], { type: "text/markdown" });
      saveAs(blob, `${originName}.md`);
    }
  };

  return (
    <button
      onClick={downloadMarkdownFile}
      className="flex items-center p-2 mr-2 rounded-lg hover:bg-gray-400"
    >
      <img src={downloadIcon} className="h-5 mr-2" alt="Download Icon" />
      Download
    </button>
  );
};

export default DownloadButton;
