import {getRandomPoint, mockOffersByType, mockDestinations} from '../mock/points.js';
import {getAviableOffers, getNowDate} from '../utils.js';

class Destination {
  constructor(args){
    const [id, description, name, pictures] = Object.values(args);
    this.id = id;
    this.description = description;
    this.name = name;
    this.pictures = pictures;
  }
}

class Offer {
  constructor(args){
    const [id, title, price] = Object.values(args);
    this.id = id;
    this.title = title;
    this.price = price;
  }
}

class LocalPoint {
  constructor() {
    this.destination = null;
    this.dateFrom = getNowDate();
    this.dateTo = getNowDate();
    this.type = null;
    this.basePrice = 0;
    this.offers = new Array();
  }
}

class Point extends LocalPoint{
  constructor(args){
    super();
    const [id, destination, dateFrom, dateTo, offers, basePrice, type] = Object.values(args);
    this.id = id;
    this.destination = destination;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.type = type;
    this.basePrice = basePrice;
    this.offers = offers;
  }
}

export default class DataModel {
  point = getRandomPoint();
  newPoint = new LocalPoint();

  getData() {
    this.point = new Point(this.point);
    this.aviableOffers = getAviableOffers(mockOffersByType, this.point.type).map((offer) => new Offer(offer));
    this.aviableDestinations = mockDestinations.map((destination) => new Destination(destination));
    return {
      point: this.point,
      aviableOffers: this.aviableOffers,
      aviableDestinations: this.aviableDestinations
    };
  }

  getNewData() {
    this.aviableOffers = getAviableOffers(mockOffersByType, this.newPoint.type).map((offer) => new Offer(offer));
    this.aviableDestinations = mockDestinations.map((destination) => new Destination(destination));
    return {
      point: this.newPoint,
      aviableOffers: this.aviableOffers,
      aviableDestinations: this.aviableDestinations
    };
  }
}
