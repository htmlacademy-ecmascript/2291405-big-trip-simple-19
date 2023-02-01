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

const ErrorType = {
  LOADING: 'loading'
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
  ITIN: 'INIT',
  LOAD: 'LOAD'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const AUTHORIZATION = 'Basic 57enTLxAoRqkx6X';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

export {POINT_TYPES, FilterType, ErrorType, SortType, UserAction, UpdateType, Method, AUTHORIZATION, END_POINT};
