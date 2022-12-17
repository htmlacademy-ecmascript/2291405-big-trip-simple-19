import {getRandomPoint, getPointsSortByDate} from '../mock/points.js';
import {getNowDate} from '../utils.js';

const BLANK_POINT = {
  destination: null,
  dateFrom: getNowDate(),
  dateTo: getNowDate(),
  type: null,
  basePrice: 0,
  offers: new Array()
};

export default class DataModel {
  point = getRandomPoint();
  points = getPointsSortByDate();

  getPoint() {
    return this.point;
  }

  getNewPoint() {
    return BLANK_POINT;
  }

  getPoints() {
    return this.points;
  }
}
