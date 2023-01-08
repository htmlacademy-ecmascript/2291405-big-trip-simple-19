import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';


function createFilterTemplate(filters) {

  const isEnabledFilter = (name) => (filters.find((filter) => filter.name === name).count) ? '' : 'disabled';

  return Object.entries(FilterType).map(
    ([name, label]) => `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${label}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${label}" ${isEnabledFilter(label)}>
        <label class="trip-filters__filter-label" for="filter-${label}">${name}</label>
      </div>`
  ).join('');
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
