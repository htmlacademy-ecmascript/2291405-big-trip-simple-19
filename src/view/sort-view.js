import AbstractView from '../framework/view/abstract-view.js';
import {getPairsFromMap} from '../utils/common.js';
import {SortType} from '../const.js';


const SortTypes = new Map([
  ['day', {sort: SortType.DATE_FROM, label: 'Day', checked: true, disabled: false}],
  ['event', {sort: SortType.NO_SORT, label: 'Event', checked: false, disabled: true}],
  ['time', {sort: SortType.NO_SORT, label: 'Time', checked: false, disabled: true}],
  ['price', {sort: SortType.PRICE, label: 'Price', checked: false, disabled: false}],
  ['offer', {sort: SortType.NO_SORT, label: 'Offers', checked: false, disabled: true}]
]);


function createSortTemplate(currentSortType) {
  SortTypes.forEach((value, key) => {
    value.checked = key === currentSortType;
  });
  const sortTypes = getPairsFromMap(SortTypes);

  const isChecked = (sortType) => (sortType) ? 'checked' : '';
  const isDisabled = (sortType) => (sortType) ? 'disabled' : '';

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map(([key, value]) => `<div class="trip-sort__item  trip-sort__item--${key}">
          <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}" ${isChecked(value.checked)} ${isDisabled(value.disabled)}>
          <label class="trip-sort__btn" for="sort-${key}" data-sort-type="${value.sort}" data-sort-key="${key}">${value.label}</label>
        </div>`).join('\n')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL'){
      return;
    } else {
      if (SortTypes.get(evt.target.dataset.sortKey).disabled) {
        return;
      }
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
