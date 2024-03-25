import parseNumberingData from "./parseNumberingData";
import parseRelationshipsData from "./parseRelationshipsData";

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
    const content = `${headingLevel}${numberingLevel}${markdownSyntax}${node.textContent.trim()}${markdownSyntax.split("").reverse().join("").replace(">u<", "</u>")}`;
    markdown += isListItem || depth === 0 ? `${content}` : `${content} `;
  } else if (node.nodeType === 1) {
    if (node.nodeName === "w:p") {
      if (!markdown.endsWith("\n\n")) {
        markdown += "\n";
      }

      const styles = node.getElementsByTagName("w:pStyle");
      for (let style of styles) {
        const styleId = style.getAttribute("w:val");
        switch (styleId) {
          case "Title":
          case "Heading1":
            newHeadingLevel = "# ";
            break;
          case "Subtitle":
          case "Heading2":
            newHeadingLevel = "## ";
            break;
          case "Heading3":
            newHeadingLevel = "### ";
            break;
          case "Heading4":
            newHeadingLevel = "#### ";
            break;
          case "Heading5":
            newHeadingLevel = "##### ";
            break;
          default:
            newHeadingLevel = "###### ";
            break;
        }
      }

      const numPr = node.getElementsByTagName("w:numPr")[0];
      if (numPr) {
        const numId = numPr
          .getElementsByTagName("w:numId")[0]
          .getAttribute("w:val");
        const ilvlElement = numPr.getElementsByTagName("w:ilvl")[0];
        const ilvl = ilvlElement ? ilvlElement.getAttribute("w:val") : "0";
        const numberingDefinition =
          numberingMap[numId] && numberingMap[numId][ilvl];

        if (numberingDefinition) {
          listItemCounters[numId] = listItemCounters[numId] || {};
          listItemCounters[numId][ilvl] =
            (listItemCounters[numId][ilvl] || 0) + 1;

          let prefix = "";
          if (numberingDefinition.numFmt === "bullet") {
            prefix = "   ".repeat(parseInt(ilvl)) + "- ";
          } else {
            const counter = listItemCounters[numId][ilvl];
            prefix =
              "   ".repeat(parseInt(ilvl)) +
              (ilvl === "0"
                ? counter + "."
                : String.fromCharCode(96 + counter) + ".");
          }

          newNumberingLevel = prefix + " ";
          isListItem = true;
        }
      }
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

    for (const child of Array.from(node.childNodes)) {
      const childMarkdown = await printTextNodes(
        child,
        docxFilesData,
        "",
        depth + 1,
        newHeadingLevel,
        newNumberingLevel,
        newMarkdownSyntax,
        listItemCounters,
        isListItem,
        processedImages,
        addedImages,
      );
      markdown += childMarkdown;
    }
  }

  return markdown;
}

export default printTextNodes;
