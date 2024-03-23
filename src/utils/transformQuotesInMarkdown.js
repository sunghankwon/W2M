async function transformQuotesInMarkdown(markdown) {
  let markdownSentences = markdown.split(`\n`);
  let transformedArray = markdownSentences.map((str) => {
    const pattern = /\*\*<u>\((.*?)#\)<\/u>\*\*/g;
    let transformedStr = str.replace(pattern, (p1) => {
      let cleanedQuote = p1.replace(/(\*\*|_|<u>|<\/u>)/g, "");

      return `> ${cleanedQuote}`;
    });

    return transformedStr;
  });

  return transformedArray.join("\n");
}

export default transformQuotesInMarkdown;
