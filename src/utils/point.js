import {POINT_TYPES} from '../const.js';
import dayjs from 'dayjs';


function getOffersByType(offers, pointType) {
  pointType = (pointType) ? pointType : POINT_TYPES[0];
  return offers.find((offer) => offer.type === pointType).offers;
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

function sortPriceDown(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortDateUp(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}


export {getOffersByType, hasDestination, sortPriceDown, sortDateUp};
