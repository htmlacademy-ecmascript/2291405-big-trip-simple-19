import AbstractView from '../framework/view/abstract-view.js';
import {getPairsFromMap} from '../utils.js';

const SORT_TYPES = new Map([
  ['day', {label: 'Day', checked: true}],
  ['event', {label: 'Event', checked: false}],
  ['time', {label: 'Time', checked: false}],
  ['price', {label: 'Price', checked: false}],
  ['offer', {label: 'Offers', checked: false}]
]);


function createSortTemplate() {
  const sortTypes = getPairsFromMap(SORT_TYPES);

  const isChecked = (typeSort) => (typeSort) ? 'checked' : 'disabled';

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map(([key, value]) => `<div class="trip-sort__item  trip-sort__item--${key}">
          <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}" ${isChecked(value.checked)}>
          <label class="trip-sort__btn" for="sort-${key}">${value.label}</label>
        </div>`).join('\n')}
    </form>`
  );
}

export default class SortView extends AbstractView {

  get template() {
    return createSortTemplate();
  }
}
