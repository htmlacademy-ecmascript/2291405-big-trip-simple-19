import {getPointsSortByDate} from '../mock/points.js';


export default class PointsModel {
  #points = getPointsSortByDate();

  get points() {
    return this.#points;
  }
}
