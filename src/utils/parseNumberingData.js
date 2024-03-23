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

export default parseNumberingData;
