const POINT_TYPES = [
  'train',
  'taxi',
  'bus',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DATE_FROM: 'date-from',
  PRICE: 'price',
  NO_SORT: '',
};

export {POINT_TYPES, FilterType, SortType};
