import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getHumanizeDate} from '../utils/date.js';
import {isNotEmptyArray, getLastWord, setFirstSymbolToUpperCase} from '../utils/common.js';
import {hasDestination, getAviableOffers, getAviableDestinations} from '../utils/point.js';
import {POINT_TYPES} from '../const.js';

function createEditPointOffersTemplate(aviableOffers, offers) {

  const checkOfferPoint = (offerId) => (offers.includes(offerId)) ? 'checked' : '';

  return (aviableOffers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getLastWord(offer.title)}-1" type="checkbox" name="event-${getLastWord(offer.title)}" ${checkOfferPoint(offer.id)}>
        <label class="event__offer-label" for="event-offer-${getLastWord(offer.title)}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`)).join('\n');
}

function createPointTypeTemplate(pointType) {

  const checkedTypePoint = (t) => (t === pointType) ? 'checked' : '';

  return POINT_TYPES.map((value) => `<div class="event__type-item">
        <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${value} ${checkedTypePoint(value)}>
        <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${setFirstSymbolToUpperCase(value)}</label>
    </div>`).join('\n');
}

function createEditPointTemplate(data) {
  const {destination, dateFrom, dateTo, offers, type, basePrice, aviableDestinations, aviableOffers} = data;

  const offersTemplate = createEditPointOffersTemplate(aviableOffers, offers);

  const pointTypesTemplate = createPointTypeTemplate(type);

  const pointDestination = aviableDestinations.find((d) => d.id === destination);

  const namePointType = setFirstSymbolToUpperCase(type);

  return (
    `<form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${pointTypesTemplate}
                </fieldset>
              </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${namePointType}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${aviableDestinations.map((d) => `<option value="${d.name}"></option>`).join('')}
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizeDate(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizeDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          ${isNotEmptyArray(aviableOffers) ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersTemplate}
          </div>
          </section>` : ''}

          ${hasDestination(destination) ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description}</p>

            ${isNotEmptyArray(pointDestination.pictures) ? `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${pointDestination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('')}
                </div>
            </div>` : ''}
          </section>` : ''}
        </section>
    </form>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;

  constructor({point, onFormSubmit}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.closest('form').addEventListener('submit', this.#formSubmitHandler);
    const elements = this.element.querySelectorAll('.event__type-input');
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', this.#typePointChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #typePointChangeHandler = (evt) => {
    this.updateElement({
      aviableOffers: getAviableOffers(evt.target.value),
      offers: [],
      type: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: this._state.aviableDestinations.find((d) => d.name === evt.target.value).id,
    });
  };

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  static parsePointToState(point) {
    return {...point,
      aviableDestinations: getAviableDestinations(),
      aviableOffers: getAviableOffers(point.type),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.aviableOffers;
    delete point.aviableDestinations;

    return point;
  }
}
