function getNumberingLevel(numPr, numberingMap, listItemCounters) {
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
      listItemCounters[numId][ilvl] = (listItemCounters[numId][ilvl] || 0) + 1;

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

      return { numberingLevel: prefix + " ", isListItem: true };
    }
  }
  return { numberingLevel: "", isListItem: false };
}

export default getNumberingLevel;
