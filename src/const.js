const POINT_TYPES = new Map([
  ['train', 'Поезд'],
  ['taxi', 'Такси'],
  ['bus', 'Автобус'],
  ['ship', 'Корабль'],
  ['drive', 'Автомобиль'],
  ['flight', 'Самолёт'],
  ['check-in', 'Бронирование'],
  ['sightseeing', 'Экскурсия'],
  ['restaurant', 'Ресторан'],
]);

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

export {POINT_TYPES, FilterType};
