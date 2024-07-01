import { marked } from "marked";

const getMarkdownText = (markdown) => {
  const rawMarkup = marked.parse(markdown);
  return { __html: rawMarkup };
};

export default getMarkdownText;
