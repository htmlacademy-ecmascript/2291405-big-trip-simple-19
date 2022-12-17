import {createElement} from '../render.js';
import {getHumanizeDate, getPairsFromMap, isNotEmptyArray, getValueFromMap, hasDestination, getFirstMapElement, getAviableOffers} from '../utils.js';
import {POINT_TYPES} from '../const.js';


function createNewPointOffersTemplate(aviableOffers, offers) {
  const checkOfferPoint = (offerId) => (offers.includes(offerId)) ? 'checked' : '';

  return (aviableOffers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checkOfferPoint(offer.id)}>
        <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`)).join('\n');
}

function createPointTypeTemplate(pointType) {
  const pointTypes = getPairsFromMap(POINT_TYPES);

  pointType = (pointType) ? pointType : getFirstMapElement(POINT_TYPES);
  const checkedTypePoint = (t) => (t === pointType) ? 'checked' : '';

  return pointTypes.map(([key, value]) => `<div class="event__type-item">
        <input id="event-type-${key}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${key} ${checkedTypePoint(key)}>
        <label class="event__type-label  event__type-label--${key}" for="event-type-${key}-1">${value}</label>
    </div>`).join('\n');
}

function createNewPointTemplate(point, aviableDestinations) {
  const {destination, dateFrom, dateTo, offers, type, basePrice} = point;

  const aviableOffers = getAviableOffers(type);

  const offersTemplate = createNewPointOffersTemplate(aviableOffers, offers);

  const pointTypesTemplate = createPointTypeTemplate(type);

  const pointDestination = aviableDestinations.find((d) => d.id === destination);

  const namePointType = getValueFromMap(POINT_TYPES, getFirstMapElement(POINT_TYPES));

  return (
    `<form class="event event--edit" action="#" method="post">
        <header class="event__header">
            <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${getFirstMapElement(POINT_TYPES)}.png" alt="Event type icon">
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
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
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
            <button class="event__reset-btn" type="reset">Cancel</button>
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


export default class AddNewPointView {
  constructor(point, aviableDestinations) {
    this.point = point;
    this.aviableDestinations = aviableDestinations;
  }

  getTemplate() {
    return createNewPointTemplate(this.point, this.aviableDestinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
