import {POINT_TYPES} from '../const.js';
import {mockDestinations, mockOffersByType} from '../mock/points.js';
import {getFirstMapElement} from './common.js';
import dayjs from 'dayjs';

function getAviableOffers(pointType) {
  pointType = (pointType) ? pointType : getFirstMapElement(POINT_TYPES);
  return mockOffersByType.find((offer) => offer.type === pointType).offers;
}

function getAviableDestinations() {
  return mockDestinations;
}

function hasDestination(destination) {
  return Boolean(destination);
}

function getWeightForNullValue(valueA, valueB) {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
}

function sortPriceUp(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.basePrice, pointB.basePrice);

  return weight ?? pointA.basePrice - pointB.basePrice;
}

function sortDateUp(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}


export {getAviableOffers, hasDestination, getAviableDestinations, sortPriceUp, sortDateUp};
