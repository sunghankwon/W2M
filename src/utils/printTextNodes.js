const printTextNodes = (
  node,
  markdown = "",
  depth = 0,
  headingLevel = "",
  markdownSyntax = "",
) => {
  if (node.nodeType === 3 && node.textContent.trim()) {
    const reverseSyntax = markdownSyntax
      .split("")
      .reverse()
      .join("")
      .replace(">u<", "</u>");

    markdown += `${headingLevel}${markdownSyntax}${node.textContent.trim()}${reverseSyntax}\n`;
  } else if (node.nodeType === 1) {
    let newHeadingLevel = headingLevel;
    let newMarkdownSyntax = markdownSyntax;

    if (node.nodeName === "w:p") {
      markdown += "\n";
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
      const boldStyles = node.getElementsByTagName("w:b");

      for (let bold of boldStyles) {
        const styleId = bold.getAttribute("w:val");
        if (!newMarkdownSyntax.includes("**")) {
          switch (styleId) {
            case "1":
              newMarkdownSyntax += "**";
              break;
          }
        }
      }

      const italicStyles = node.getElementsByTagName("w:i");

      for (let italic of italicStyles) {
        const styleId = italic.getAttribute("w:val");
        if (!newMarkdownSyntax.includes("_")) {
          switch (styleId) {
            case "1":
              newMarkdownSyntax += "_";
              break;
          }
        }
      }

      const underLineStyles = node.getElementsByTagName("w:u");

      for (let underLine of underLineStyles) {
        const styleId = underLine.getAttribute("w:val");
        if (!newMarkdownSyntax.includes("<u>")) {
          switch (styleId) {
            case "single":
              newMarkdownSyntax += "<u>";
              break;
          }
        }
      }
    }

    Array.from(node.childNodes).forEach((child) => {
      markdown = printTextNodes(
        child,
        markdown,
        depth + 1,
        newHeadingLevel,
        newMarkdownSyntax,
      );
    });
  }

  return markdown;
};

export default printTextNodes;
