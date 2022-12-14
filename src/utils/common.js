
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getPairsFromMap(data) {
  const result = new Array();
  data.forEach((value, key) => result.push([key, value]));
  return result;
}

function isNotEmptyArray(data) {
  return Boolean(data.length);
}

function getValueFromMap(data, key) {
  return data.get(key) ? data.get(key) : '';
}

function getFirstMapElement(data) {
  return data.keys().next().value;
}

export {getRandomArrayElement, getPairsFromMap, isNotEmptyArray,
  getValueFromMap, getFirstMapElement};
