import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';


export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updateTask(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'base_price': point.basePrice ? Number(point.basePrice) : null,
    };

    delete adaptedPoint.dateTo;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.basePrice;

    return adaptedPoint;
  }
}
