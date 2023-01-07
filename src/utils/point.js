import {POINT_TYPES} from '../const.js';
import {mockDestinations, mockOffersByType} from '../mock/points.js';
import {getFirstMapElement} from './common.js';

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

export {getAviableOffers, hasDestination, getAviableDestinations};
