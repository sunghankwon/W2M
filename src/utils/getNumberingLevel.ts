interface NumberingDefinition {
  numFmt: string;
}

interface NumberingMap {
  [numId: string]: {
    [ilvl: string]: NumberingDefinition;
  };
}

interface ListItemCounters {
  [numId: string]: {
    [ilvl: string]: number;
  };
}

interface NumberingLevelResult {
  numberingLevel: string;
  isListItem: boolean;
}

function getNumberingLevel(
  numPr: Element | null,
  numberingMap: NumberingMap,
  listItemCounters: ListItemCounters,
): NumberingLevelResult {
  if (numPr) {
    const numIdElement = numPr.getElementsByTagName("w:numId")[0];
    const numId = numIdElement ? numIdElement.getAttribute("w:val") : null;
    if (!numId) return { numberingLevel: "", isListItem: false };

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
