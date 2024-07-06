import { marked } from "marked";

interface Markup {
  __html: string;
}

const getMarkdownText = async (markdown: string): Promise<Markup> => {
  const rawMarkup: string = await marked.parse(markdown);
  return { __html: rawMarkup };
};

export default getMarkdownText;
