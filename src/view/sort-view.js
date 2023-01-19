import AbstractView from '../framework/view/abstract-view.js';
import {getPairsFromMap} from '../utils/common.js';
import {SortType} from '../const.js';


const SORT_TYPES = new Map([
  ['day', {sort: SortType.DATE_FROM, label: 'Day', checked: true, disabled: false}],
  ['event', {sort: SortType.NO_SORT, label: 'Event', checked: false, disabled: true}],
  ['time', {sort: SortType.NO_SORT, label: 'Time', checked: false, disabled: true}],
  ['price', {sort: SortType.PRICE, label: 'Price', checked: false, disabled: false}],
  ['offer', {sort: SortType.NO_SORT, label: 'Offers', checked: false, disabled: true}]
]);


function createSortTemplate() {
  const sortTypes = getPairsFromMap(SORT_TYPES);

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

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL'){
      return;
    } else {
      if (SORT_TYPES.get(evt.target.dataset.sortKey).disabled) {
        return;
      }
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
