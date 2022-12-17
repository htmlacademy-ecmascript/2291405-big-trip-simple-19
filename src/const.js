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

const SORT_TYPES = new Map([
  ['day', 'Day'],
  ['event', 'Event'],
  ['time', 'Time'],
  ['price', 'Price'],
  ['offer', 'Offers']
]);

export {POINT_TYPES, SORT_TYPES};
