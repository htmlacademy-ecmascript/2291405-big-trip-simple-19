import dayjs from 'dayjs';
import {POINT_TYPES} from './const.js';
import {mockOffersByType} from './mock/points.js';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getHumanizeDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function getDateWithoutTime(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

function getDayFromDate(date) {
  return dayjs(date).format('MMM DD');
}

function getTimeFromDate(date) {
  return dayjs(date).format('HH:mm');
}

function getDateWithoutSeconds(date) {
  return dayjs(date).format('YYYY-MM-DDThh:mm');
}

function getPairsFromMap(data) {
  const result = new Array();
  data.forEach((value, key) => result.push([key, value]));
  return result;
}

function getAviableOffers(pointType) {
  pointType = (pointType) ? pointType : getFirstMapElement(POINT_TYPES);
  return mockOffersByType.find((offer) => offer.type === pointType).offers;
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

export {getRandomArrayElement, getHumanizeDate, getPairsFromMap, getAviableOffers,
  isNotEmptyArray, getValueFromMap, getNowDate, hasDestination, getFirstMapElement,
  getDateWithoutTime, getDayFromDate, getTimeFromDate, getDateWithoutSeconds
};
