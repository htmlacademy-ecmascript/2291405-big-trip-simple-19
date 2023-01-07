import {FilterType} from '../const';
import {isPlannedDate} from '../utils/date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPlannedDate(point.dateFrom)),
};

export {filter};
