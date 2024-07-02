import copyIcon from "../../assets/copy.png";
import checkIcon from "../../assets/check.png";

interface CopyButtonProps {
  markdownText: string;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  iconSrc: string;
  setIconSrc: React.Dispatch<React.SetStateAction<string>>;
}

const CopyButton = ({
  markdownText,
  buttonText,
  setButtonText,
  iconSrc,
  setIconSrc,
}: CopyButtonProps) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(markdownText)
      .then(() => {
        setButtonText("Copied!");
        setIconSrc(checkIcon);

        setTimeout(() => {
          setButtonText("Copy Markdown");
          setIconSrc(copyIcon);
        }, 2000);
      })
      .catch((error) => {
        console.error("Copy failed: ", error);
      });
  };

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center p-2 rounded-lg hover:bg-stone-600"
    >
      <img src={iconSrc} className="h-5 mr-2" alt="Copy Icon" />
      {buttonText}
    </button>
  );
};

export default CopyButton;
