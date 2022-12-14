import dayjs from 'dayjs';
import {POINT_TYPES} from './const.js';

const DATE_FORMAT = 'DD/MM/YY hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getHumanizeDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function getPairsFromMap(data) {
  const result = new Array();
  data.forEach((value, key) => result.push([key, value]));
  return result;
}

function getAviableOffers(offersByType, pointType) {
  pointType = (pointType) ? pointType : getFirstMapElement(POINT_TYPES);
  return offersByType.find((offer) => offer.type === pointType).offers;
}

function isNotEmptyArray(data) {
  return Boolean(data.length);
}

function hasDestination(destination) {
  return Boolean(destination);
}

function getValueFromMap(data, key) {
  return data.get(key) ? data.get(key) : '';
}

function getNowDate() {
  return dayjs();
}

function getFirstMapElement(data) {
  return data.keys().next().value;
}

export {getRandomArrayElement, getHumanizeDate, getPairsFromMap, getAviableOffers, isNotEmptyArray, getValueFromMap, getNowDate, hasDestination, getFirstMapElement};
