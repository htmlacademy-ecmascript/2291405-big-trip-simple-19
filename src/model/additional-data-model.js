import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


export default class AdditionalDataModel extends Observable{
  #destinations = [];
  #offers = [];
  #additionalApiService = null;

  constructor({additionalApiService}) {
    super();
    this.#additionalApiService = additionalApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#additionalApiService.destinations;
      this.#offers = await this.#additionalApiService.offers;
      this._notify(UpdateType.LOAD, {destinations: this.#destinations, offers: this.#offers});
    } catch(err) {
      this.#destinations = [];
      this.#offers = [];
      throw err;
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
