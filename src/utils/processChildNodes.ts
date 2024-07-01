import printTextNodes from "./printTextNodes";

interface DocxFilesData {
  [key: string]: string;
}

interface ListItemCounters {
  [numId: string]: {
    [ilvl: string]: number;
  };
}

async function processChildNodes(
  node: ChildNode,
  docxFilesData: DocxFilesData,
  markdown: string,
  depth: number,
  headingLevel: string,
  numberingLevel: string,
  markdownSyntax: string,
  listItemCounters: ListItemCounters,
  isListItem: boolean,
  processedImages: Set<string>,
  addedImages: Set<string>,
): Promise<string> {
  for (const child of Array.from(node.childNodes)) {
    const childMarkdown = await printTextNodes(
      child,
      docxFilesData,
      "",
      depth + 1,
      headingLevel,
      numberingLevel,
      markdownSyntax,
      listItemCounters,
      isListItem,
      processedImages,
      addedImages,
    );
    markdown += childMarkdown;
  }
  return markdown;
}

export default processChildNodes;
