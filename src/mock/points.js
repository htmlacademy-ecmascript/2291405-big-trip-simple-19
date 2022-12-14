import {getRandomArrayElement} from '../utils.js';


const mockPoints = [
  {
    id: 1,
    destionation: 1,
    dateFrom: '2022-07-10T22:55:56.845Z',
    dateTo: '2022-07-11T11:22:13.375Z',
    offers: [1, 4],
    basePrice: 5800,
    type: 'train'
  },
  {
    id: 2,
    destionation: 3,
    dateFrom: '2022-09-26T22:55:56.845Z',
    dateTo: '2022-10-01T11:22:13.375Z',
    offers: [],
    basePrice: 500,
    type: 'sightseeing'
  },
  {
    id: 3,
    destionation: 2,
    dateFrom: '2022-09-26T22:55:56.845Z',
    dateTo: '2022-10-01T11:22:13.375Z',
    offers: [3],
    basePrice: 7500,
    type: 'flight'
  }
];

const mockDestinations = [
  {
    id: 1,
    description: 'Эх, Москва, Москва...Россия',
    name: 'Москва',
    pictures: [
      {
        id: 2,
        description: 'Картина №2',
        src: 'img/photos/2.jpg'
      }
    ]
  },
  {
    id: 2,
    description: '100500 оттенков серого',
    name: 'Санк-Петербург',
    pictures: [
      {
        description: 'Картина №5',
        src: 'img/photos/5.jpg'
      },
      {
        description: 'Картина №3',
        src: 'img/photos/3.jpg'
      },
    ]
  },
  {
    id: 3,
    description: 'Пиво и набережная',
    name: 'Самара',
    pictures: [
      {
        id: 1,
        description: 'Картина №1',
        src: 'img/photos/1.jpg'
      },
      {
        id: 4,
        description: 'Картина №4',
        src: 'img/photos/4.jpg'
      }
    ]
  }
];

const mockOffersByType = [
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'bus',
    offers: [
      {
        id: 4,
        title: 'Выбрать место',
        price: 1000
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Добавить багаж',
        price: 500
      },
      {
        id: 2,
        title: 'Перейти в комфорт-класс',
        price: 2500
      },
      {
        id: 4,
        title: 'Выбрать место',
        price: 1000
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Добавить багаж',
        price: 500
      },
      {
        id: 2,
        title: 'Перейти в комфорт-класс',
        price: 2500
      },
      {
        id: 3,
        title: 'Включить завтрак',
        price: 1200
      },
      {
        id: 4,
        title: 'Выбрать место',
        price: 1000
      }
    ]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint, mockOffersByType, mockDestinations};
