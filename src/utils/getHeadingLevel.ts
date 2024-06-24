function getHeadingLevel(styles: Element[]): string {
  let headingLevel = "";
  for (const style of styles) {
    const styleId = style.getAttribute("w:val");
    switch (styleId) {
      case "Title":
      case "Heading1":
        headingLevel = "# ";
        break;
      case "Subtitle":
      case "Heading2":
        headingLevel = "## ";
        break;
      case "Heading3":
        headingLevel = "### ";
        break;
      case "Heading4":
        headingLevel = "#### ";
        break;
      case "Heading5":
        headingLevel = "##### ";
        break;
      default:
        headingLevel = "###### ";
        break;
    }
  }
  return headingLevel;
}

export default getHeadingLevel;
