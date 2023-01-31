import {getRandomArrayElement} from '../utils/common.js';


const mockPoints = [
  {
    id: 1,
    destination: 1,
    dateFrom: '2022-01-07T15:05:56.845Z',
    dateTo: '2022-07-11T05:07:13.375Z',
    offers: [1, 4],
    basePrice: 5800,
    type: 'train'
  },
  {
    id: 2,
    destination: 3,
    dateFrom: '2022-09-15T10:00:56.845Z',
    dateTo: '2022-09-15T12:00:13.375Z',
    offers: [],
    basePrice: 500,
    type: 'sightseeing'
  },
  {
    id: 3,
    destination: 2,
    dateFrom: '2023-09-26T22:55:56.845Z',
    dateTo: '2023-10-01T11:22:13.375Z',
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
    type: 'check-in',
    offers: []
  },
  {
    type: 'bus',
    offers: [
      {
        id: 4,
        title: 'Choose seats',
        price: 1000
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 2,
        title: 'Switch to comfort',
        price: 150
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 500
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 2500
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 1000
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 100
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 4,
        title: 'Choose seats',
        price: 1000
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 500
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 1000
      },
      {
        id: 3,
        title: 'Add meal',
        price: 1200
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 500
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 2500
      },
      {
        id: 3,
        title: 'Add meal',
        price: 1200
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 1000
      }
    ]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function getPointsSortByDate() {
  return mockPoints.sort((p) => p.dateTo);
}


export {getRandomPoint, mockOffersByType, getPointsSortByDate, mockDestinations};
