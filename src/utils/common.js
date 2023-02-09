function getPairsFromMap(data) {
  const result = new Array();
  data.forEach((value, key) => result.push([key, value]));
  return result;
}

function isNotEmptyArray(data) {
  return Boolean(data.length);
}

function getLastWord(text) {
  const words = text.split(' ');
  return words[words.length - 1];
}

function setFirstSymbolToUpperCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export {getPairsFromMap, isNotEmptyArray, getLastWord, setFirstSymbolToUpperCase};
