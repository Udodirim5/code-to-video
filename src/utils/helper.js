export function tokenizeLine(line) {
  const keywords = /\b(const|let|var|function|return|if|else|for|while|switch|case|break|default|true|false|null|undefined|new|class|import|export|async|await|try|catch|throw)\b/g;
  const strings = /(".*?"|'.*?'|`.*?`)/g;
  const numbers = /\b\d+(\.\d+)?\b/g;
  const comments = /(\/\/.*$)/g;

  const tokens = [];
  let lastIndex = 0;

  const allMatches = [
    ...line.matchAll(keywords),
    ...line.matchAll(strings),
    ...line.matchAll(numbers),
    ...line.matchAll(comments),
  ];

  const sorted = allMatches.sort((a, b) => a.index - b.index);

  sorted.forEach((match) => {
    const { index } = match;
    const text = match[0];

    if (index > lastIndex) {
      tokens.push({
        text: line.slice(lastIndex, index),
        color: "#f8f8f2", // default color
      });
    }

    let color = "#f8f8f2";
    if (keywords.test(text)) color = "#ff79c6";
    else if (strings.test(text)) color = "#f1fa8c";
    else if (numbers.test(text)) color = "#bd93f9";
    else if (comments.test(text)) color = "#6272a4";

    tokens.push({ text, color });

    lastIndex = index + text.length;
  });

  if (lastIndex < line.length) {
    tokens.push({
      text: line.slice(lastIndex),
      color: "#f8f8f2",
    });
  }

  return tokens;
}
