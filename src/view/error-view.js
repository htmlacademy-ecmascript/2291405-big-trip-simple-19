import AbstractView from '../framework/view/abstract-view.js';
import {ErrorType} from '../const.js';

const ErrorTextType = {
  [ErrorType.LOADING]: 'Error loading data',
};

function createErrorTemplate(errorType) {
  const errorTextValue = ErrorTextType[errorType];

  return (
    `<p class="trip-events__msg">
      ${errorTextValue}
    </p>`
  );
}

export default class ErrorView extends AbstractView {
  #errorType = null;

  constructor({errorType}) {
    super();
    this.#errorType = errorType;
  }

  get template() {
    return createErrorTemplate(this.#errorType);
  }
}
