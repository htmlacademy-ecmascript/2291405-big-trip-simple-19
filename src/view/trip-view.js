import AbstractView from '../framework/view/abstract-view.js';
import {getDateWithoutTime, getDayFromDate, getTimeFromDate,
  getDateWithoutSeconds} from '../utils/date.js';
import {setFirstSymbolToUpperCase} from '../utils/common.js';
import {getOffersByType} from '../utils/point.js';


function createPointOffersTemplate(availableOffers, offers) {
  const checkOffersPoint = availableOffers.filter((offer) => offers.includes(offer.id));

  return checkOffersPoint.map((offer) =>
    `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('\n');
}

function createTripTemplate(point, availableDestinations, availableOffers) {
  const {destination, dateFrom, dateTo, offers, type, basePrice} = point;

  const offersByType = getOffersByType(availableOffers, type);

  const namePointType = setFirstSymbolToUpperCase(type);

  const pointDestination = availableDestinations.find((d) => d.id === destination);

  const offersTemplate = createPointOffersTemplate(offersByType, offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDateWithoutTime(dateFrom)}">${getDayFromDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${namePointType} ${pointDestination ? pointDestination.name : ''}</h3>
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

export default class TripView extends AbstractView {
  #point = null;
  #availableDestinations = null;
  #availableOffers = null;
  #handleEditClick = null;

  constructor({point, availableDestinations, availableOffers, onEditClick}) {
    super();
    this.#point = point;
    this.#availableDestinations = availableDestinations;
    this.#availableOffers = availableOffers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTripTemplate(this.#point, this.#availableDestinations, this.#availableOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
