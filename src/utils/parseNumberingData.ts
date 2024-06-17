interface LevelDefinition {
  numFmt: string;
  lvlText: string;
}

interface LevelsDefinition {
  [key: string]: LevelDefinition;
}

interface NumIdToDefinition {
  [key: string]: LevelsDefinition;
}

function parseNumberingData(numberingDataXml: string): NumIdToDefinition {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(numberingDataXml, "application/xml");
  const nums = xmlDoc.getElementsByTagName("w:num");
  const abstractNums = xmlDoc.getElementsByTagName("w:abstractNum");
  const abstractNumIdToDefinition: { [key: string]: LevelsDefinition } = {};

  for (let i = 0; i < abstractNums.length; i++) {
    const abstractNum = abstractNums[i];
    const abstractNumId = abstractNum.getAttribute("w:abstractNumId");
    const lvls = abstractNum.getElementsByTagName("w:lvl");
    const levelsDefinition: LevelsDefinition = {};

    for (let j = 0; j < lvls.length; j++) {
      const lvl = lvls[j];
      const ilvl = lvl.getAttribute("w:ilvl");
      const numFmt = lvl
        .getElementsByTagName("w:numFmt")[0]
        .getAttribute("w:val");
      const lvlText = lvl
        .getElementsByTagName("w:lvlText")[0]
        .getAttribute("w:val");

      if (ilvl && numFmt && lvlText) {
        levelsDefinition[ilvl] = { numFmt, lvlText };
      }
    }

    if (abstractNumId) {
      abstractNumIdToDefinition[abstractNumId] = levelsDefinition;
    }
  }

  const numIdToDefinition: NumIdToDefinition = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const numId = num.getAttribute("w:numId");
    const abstractNumIdRef = num
      .getElementsByTagName("w:abstractNumId")[0]
      .getAttribute("w:val");

    if (numId && abstractNumIdRef) {
      numIdToDefinition[numId] = abstractNumIdToDefinition[abstractNumIdRef];
    }
  }

  return numIdToDefinition;
}

export default parseNumberingData;
