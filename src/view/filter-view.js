import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';


function createFilterTemplate(filters, currentFilter) {
  const isEnabledFilter = (name) => (filters.find((filter) => filter.name === name).count) ? '' : 'disabled';
  const isCheckedFilter = (name) => (name === currentFilter) ? 'checked' : '';

  return Object.entries(FilterType).map(
    ([name, label]) => `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${label}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${label}" ${isEnabledFilter(label)} ${isCheckedFilter(label)}>
        <label class="trip-filters__filter-label" for="filter-${label}">${name}</label>
      </div>`
  ).join('');
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
