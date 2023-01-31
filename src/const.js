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
  DATE_FROM: 'day',
  PRICE: 'price',
  NO_SORT: '',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {POINT_TYPES, FilterType, SortType, UserAction, UpdateType};
