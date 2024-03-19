function printTextNodes(
  node,
  relationshipsData,
  numberingData,
  markdown = "",
  depth = 0,
  headingLevel = "",
  markdownSyntax = "",
  listItemCounters = {},
  isListItem = false,
) {
  const relationshipsMap = parseRelationshipsData(relationshipsData);
  const numberingMap = parseNumberingData(numberingData);
  let newHeadingLevel = headingLevel;
  let newMarkdownSyntax = markdownSyntax;

  if (node.nodeType === 3 && node.textContent.trim()) {
    const content = `${headingLevel}${markdownSyntax}${node.textContent.trim()}${markdownSyntax.split("").reverse().join("").replace(">u<", "</u>")}`;
    markdown += isListItem || depth === 0 ? `${content}` : `${content} `;
  } else if (node.nodeType === 1) {
    if (node.nodeName === "w:p") {
      if (!markdown.endsWith("\n\n") && markdown !== "") {
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
          default:
            newHeadingLevel = "### ";
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

          markdown += prefix + " ";
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
        Array.from(node.childNodes).forEach((child) => {
          linkMarkdown = printTextNodes(
            child,
            relationshipsData,
            numberingData,
            linkMarkdown,
            depth + 1,
            "",
            "",
          );
        });
        markdown += `[${linkMarkdown.trim()}](${targetUrl})`;
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
    }

    Array.from(node.childNodes).forEach((child) => {
      markdown = printTextNodes(
        child,
        relationshipsData,
        numberingData,
        markdown,
        depth + 1,
        newHeadingLevel,
        child.nodeName === "w:rPr" ? "" : newMarkdownSyntax,
        listItemCounters,
        isListItem,
      );
    });
  }

  return markdown;
}

function parseRelationshipsData(relationshipsDataXml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    relationshipsDataXml,
    "application/xml",
  );
  const relationships = xmlDoc.getElementsByTagName("Relationship");
  const relationshipMap = {};

  for (let relationship of relationships) {
    const id = relationship.getAttribute("Id");
    const target = relationship.getAttribute("Target");
    relationshipMap[id] = target;
  }

  return relationshipMap;
}

function parseNumberingData(numberingDataXml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(numberingDataXml, "application/xml");
  const nums = xmlDoc.getElementsByTagName("w:num");
  const abstractNums = xmlDoc.getElementsByTagName("w:abstractNum");
  const abstractNumIdToDefinition = {};

  for (let abstractNum of abstractNums) {
    const abstractNumId = abstractNum.getAttribute("w:abstractNumId");
    const lvls = abstractNum.getElementsByTagName("w:lvl");
    const levelsDefinition = {};

    for (let lvl of lvls) {
      const ilvl = lvl.getAttribute("w:ilvl");
      const numFmt = lvl
        .getElementsByTagName("w:numFmt")[0]
        .getAttribute("w:val");
      const lvlText = lvl
        .getElementsByTagName("w:lvlText")[0]
        .getAttribute("w:val");
      levelsDefinition[ilvl] = { numFmt, lvlText };
    }

    abstractNumIdToDefinition[abstractNumId] = levelsDefinition;
  }

  const numIdToDefinition = {};
  for (let num of nums) {
    const numId = num.getAttribute("w:numId");
    const abstractNumIdRef = num
      .getElementsByTagName("w:abstractNumId")[0]
      .getAttribute("w:val");
    numIdToDefinition[numId] = abstractNumIdToDefinition[abstractNumIdRef];
  }

  return numIdToDefinition;
}

export default printTextNodes;
