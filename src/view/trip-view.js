import {createElement} from '../render.js';
import {getValueFromMap, getDateWithoutTime, getDayFromDate, getTimeFromDate, getDateWithoutSeconds, getAviableOffers} from '../utils.js';
import {POINT_TYPES} from '../const.js';

function createPointOffersTemplate(aviableOffers, offers) {
  const checkOffersPoint = aviableOffers.filter((offer) => offers.includes(offer.id));

  return checkOffersPoint.map((offer) =>
    `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('\n');
}

function createTripTemplate(point, aviableDestinations) {
  const {destination, dateFrom, dateTo, offers, type, basePrice} = point;

  const aviableOffers = getAviableOffers(type);

  const namePointType = getValueFromMap(POINT_TYPES, type);

  const pointDestination = aviableDestinations.find((d) => d.id === destination);

  const offersTemplate = createPointOffersTemplate(aviableOffers, offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDateWithoutTime(dateFrom)}">${getDayFromDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${namePointType} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDateWithoutSeconds(dateFrom)}">${getTimeFromDate(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDateWithoutSeconds(dateTo)}">${getTimeFromDate(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class TripView {
  #element = null;
  #point = null;
  #aviableDestinations = null;

  constructor(point, aviableDestinations) {
    this.#point = point;
    this.#aviableDestinations = aviableDestinations;
  }

  get template() {
    return createTripTemplate(this.#point, this.#aviableDestinations);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
