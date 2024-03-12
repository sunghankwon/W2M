import { marked } from "marked";

const Preview = ({ markdownText }) => {
  const getMarkdownText = () => {
    const rawMarkup = marked.parse(markdownText);
    return { __html: rawMarkup };
  };

  return (
    <div
      className="w-[706px] h-[617px] border rounded-md overflow-y-auto pl-2 markdown-preview prose lg:prose-xl"
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default Preview;
