import printTextNodes from "./printTextNodes";

async function processChildNodes(
  node,
  docxFilesData,
  markdown,
  depth,
  headingLevel,
  numberingLevel,
  markdownSyntax,
  listItemCounters,
  isListItem,
  processedImages,
  addedImages,
) {
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
