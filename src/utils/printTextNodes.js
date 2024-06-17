import parseNumberingData from "./parseNumberingData";
import parseRelationshipsData from "./parseRelationshipsData";
import getHeadingLevel from "./getHeadingLevel";
import getNumberingLevel from "./getNumberingLevel";
import processChildNodes from "./processChildNodes";

async function printTextNodes(
  node,
  docxFilesData,
  markdown = "",
  depth = 0,
  headingLevel = "",
  numberingLevel = "",
  markdownSyntax = "",
  listItemCounters = {},
  isListItem = false,
  processedImages = new Set(),
  addedImages = new Set(),
) {
  const relationshipsDataXml = docxFilesData["word/_rels/document.xml.rels"];
  const numberingDataXml = docxFilesData["word/numbering.xml"];

  const relationshipsMap = parseRelationshipsData(relationshipsDataXml);
  const numberingMap = parseNumberingData(numberingDataXml);

  let newHeadingLevel = headingLevel;
  let newMarkdownSyntax = markdownSyntax;
  let newNumberingLevel = numberingLevel;

  if (node.nodeType === 3 && node.textContent.trim()) {
    const syntaxReverse = markdownSyntax
      .split("")
      .reverse()
      .join("")
      .replace(">u<", "</u>");
    const content = `${headingLevel}${numberingLevel}${markdownSyntax}${node.textContent.trim()}${syntaxReverse}`;
    markdown += isListItem || depth === 0 ? `${content}` : `${content} `;
  } else if (node.nodeType === 1) {
    if (node.nodeName === "w:p") {
      if (!markdown.endsWith("\n\n")) {
        markdown += "\n";
      }

      const styles = node.getElementsByTagName("w:pStyle");
      newHeadingLevel = getHeadingLevel(styles);

      const numPr = node.getElementsByTagName("w:numPr")[0];
      const numberingInfo = getNumberingLevel(
        numPr,
        numberingMap,
        listItemCounters,
      );
      newNumberingLevel = numberingInfo.numberingLevel;
      isListItem = numberingInfo.isListItem;
    } else if (node.nodeName === "w:r") {
      const childStyles = node.getElementsByTagName("w:rPr")[0];
      if (childStyles) {
        if (childStyles.getElementsByTagName("w:b").length > 0)
          newMarkdownSyntax += "**";
        if (childStyles.getElementsByTagName("w:i").length > 0)
          newMarkdownSyntax += "_";
        if (childStyles.getElementsByTagName("w:u").length > 0)
          newMarkdownSyntax += "<u>";
      }
    } else if (node.nodeName === "w:hyperlink") {
      const linkId = node.getAttribute("r:id");
      const targetUrl = relationshipsMap[linkId];
      if (targetUrl) {
        let linkMarkdown = "";
        for (const child of Array.from(node.childNodes)) {
          const childMarkdown = await printTextNodes(
            child,
            docxFilesData,
            linkMarkdown,
            depth + 1,
            "",
            "",
            "",
            listItemCounters,
            isListItem,
            processedImages,
            addedImages,
          );
          linkMarkdown += childMarkdown;
        }
        markdown += `[${linkMarkdown.trim()}](${targetUrl})\n`;

        return markdown;
      }
    } else if (node.nodeName === "w:tbl") {
      let rowsMarkdown = [];
      let headerSeparator = "|";
      let isHeader = true;

      Array.from(node.getElementsByTagName("w:tr")).forEach((tr, rowIndex) => {
        let rowMarkdown = "|";
        Array.from(tr.getElementsByTagName("w:tc")).forEach((tc, cellIndex) => {
          let cellText = "";
          Array.from(tc.getElementsByTagName("w:t")).forEach((t) => {
            cellText += t.textContent;
          });

          rowMarkdown += ` ${cellText} |`;

          if (isHeader) {
            headerSeparator += " ------ |";
          }
        });

        rowsMarkdown.push(rowMarkdown);

        if (isHeader) {
          rowsMarkdown.push(headerSeparator);
          isHeader = false;
        }
      });

      markdown += rowsMarkdown.join("\n") + "\n";

      return markdown;
    } else if (node.nodeName === "w:pict") {
      const rectElements = node.getElementsByTagName("v:rect");
      if (rectElements.length > 0) {
        markdown += "---";
      }
    } else if (node.nodeName === "wp:inline" || node.nodeName === "w:drawing") {
      const blipElements = node.getElementsByTagName("a:blip");
      for (let blip of blipElements) {
        const rEmbed = blip.getAttribute("r:embed");
        const imgFilePath = relationshipsMap[rEmbed];
        const completeImgFilePath = `word/${imgFilePath}`;

        markdown += `![Image](./${completeImgFilePath})\n`;
        addedImages.add(completeImgFilePath);
        processedImages.add(rEmbed);

        return markdown;
      }
    }

    markdown = await processChildNodes(
      node,
      docxFilesData,
      markdown,
      depth,
      newHeadingLevel,
      newNumberingLevel,
      newMarkdownSyntax,
      listItemCounters,
      isListItem,
      processedImages,
      addedImages,
    );
  }

  return markdown;
}

export default printTextNodes;
