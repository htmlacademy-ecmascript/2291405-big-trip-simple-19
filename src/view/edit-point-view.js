import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getHumanizeDate} from '../utils/date.js';
import {isNotEmptyArray, getLastWord, setFirstSymbolToUpperCase} from '../utils/common.js';
import {hasDestination, getOffersByType} from '../utils/point.js';
import {POINT_TYPES} from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEditPointOffersTemplate(aviableOffers, offers, isDisabled) {

  const checkOfferPoint = (offerId) => (offers.includes(offerId)) ? 'checked' : '';

  return (aviableOffers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getLastWord(offer.title)}-1" type="checkbox" data-offer-id=${offer.id} name="event-${getLastWord(offer.title)}" ${checkOfferPoint(offer.id)} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${getLastWord(offer.title)}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`)).join('\n');
}

function createPointTypeTemplate(pointType, isDisabled) {

  const checkedTypePoint = (t) => (t === pointType) ? 'checked' : '';

  return POINT_TYPES.map((value) => `<div class="event__type-item">
        <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${value} ${checkedTypePoint(value)}  ${isDisabled ? 'disabled' : ''}>
        <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${setFirstSymbolToUpperCase(value)}</label>
    </div>`).join('\n');
}

function createEditPointTemplate(data) {
  const {
    destination,
    dateFrom,
    dateTo,
    offers,
    type,
    basePrice,
    aviableDestinations,
    aviableOffers,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const offersTemplate = createEditPointOffersTemplate(aviableOffers, offers, isDisabled);

  const pointTypesTemplate = createPointTypeTemplate(type, isDisabled);

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
              <input class="event__input  event__input--destination" id="event-destination-1" autocomplete="off" type="text" name="event-destination" value="${pointDestination ? pointDestination.name : ''}" list="destination-list-1">
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" autocomplete="off" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset"  ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
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
  #handleFormClose = null;
  #dateFromDatepicker = null;
  #dateToDatepicker = null;
  #handleDeleteClick = null;
  #aviableOffers = null;
  #aviableDestinations = null;

  constructor({point, aviableDestinations, aviableOffers, onFormSubmit, onFormClose, onDeleteClick}) {
    super();
    this.#aviableOffers = aviableOffers;
    this.#aviableDestinations = aviableDestinations;
    this._setState(EditPointView.parsePointToState(point, aviableDestinations, aviableOffers));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromDatepicker) {
      this.#dateFromDatepicker.destroy();
      this.#dateFromDatepicker = null;
    }

    if (this.#dateToDatepicker) {
      this.#dateToDatepicker.destroy();
      this.#dateToDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.closest('form').addEventListener('submit', this.#formSubmitHandler);
    const typePointElements = this.element.querySelectorAll('.event__type-input');
    for (let i = 0; i < typePointElements.length; i++) {
      typePointElements[i].addEventListener('click', this.#typePointChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('keyup', this.#destinationValidationHandler);

    const offersElements = this.element.querySelectorAll('.event__offer-checkbox');
    for (let i = 0; i < offersElements.length; i++) {
      offersElements[i].addEventListener('change', this.#offersChangeHandler);
    }

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.element.querySelector('.event__input--price').addEventListener('keydown', this.#priceValidationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #typePointChangeHandler = (evt) => {
    this.updateElement({
      aviableOffers: getOffersByType(this.#aviableOffers, evt.target.value),
      offers: [],
      type: evt.target.value,
    });
  };

  #offersChangeHandler = () => {
    const checkedOffers = document.querySelectorAll('.event__offer-checkbox:checked');
    this._setState({
      offers: [...checkedOffers].map((e) => Number(e.dataset.offerId))
    });
  };

  #destinationChangeHandler = (evt) => {
    const destination = this._state.aviableDestinations.find((d) => d.name === evt.target.value);
    this.updateElement({
      destination: destination ? destination.id : null,
    });
  };

  #destinationValidationHandler = (evt) => {
    let isValid = false;
    const matchExp = new RegExp(`^${evt.target.value}`);
    this._state.aviableDestinations.forEach((value) => {
      if ((matchExp.test(value.name)) && evt.target.value) {
        isValid = true;
      }
    });
    if (!isValid) {
      evt.target.value = evt.target.value.slice(0, -1);
    }
  };

  #setDatepickers() {
    this.#dateFromDatepicker = flatpickr(
      this.element.querySelector('input[name = "event-start-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        'time_24hr': true,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#dateToDatepicker = flatpickr(
      this.element.querySelector('input[name = "event-end-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #dateFromChangeHandler = ([date]) => {
    this.updateElement({
      dateFrom: date
    });
  };

  #dateToChangeHandler = ([date]) => {
    this.updateElement({
      dateTo: date
    });
  };

  #priceValidationHandler = (evt) => {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (((charCode < 96 || charCode > 105) && (charCode > 58 || charCode < 47) && charCode !== 8) || (evt.shiftKey)) {
      evt.preventDefault();
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point, this.#aviableDestinations, this.#aviableOffers),
    );
  }

  static parsePointToState(point, aviableDestinations, aviableOffers) {
    return {...point,
      aviableDestinations: aviableDestinations,
      aviableOffers: getOffersByType(aviableOffers, point.type),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.aviableOffers;
    delete point.aviableDestinations;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
