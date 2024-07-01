import { marked } from "marked";

interface Markup {
  __html: string;
}

const getMarkdownText = (markdown: string): Markup => {
  const rawMarkup = marked.parse(markdown) as string;
  return { __html: rawMarkup };
};

export default getMarkdownText;
