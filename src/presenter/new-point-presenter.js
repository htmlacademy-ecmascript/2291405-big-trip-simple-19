import {remove, render, RenderPosition} from '../framework/render.js';
import NewPointView from '../view/add-new-point-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #tripListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointAddComponent = null;
  #aviableOffers = null;
  #aviableDestinations = null;

  constructor({aviableDestinations, aviableOffers, tripListContainer, onDataChange, onDestroy}) {
    this.#tripListContainer = tripListContainer;
    this.#aviableOffers = aviableOffers;
    this.#aviableDestinations = aviableDestinations;

    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new NewPointView({
      aviableDestinations: this.#aviableDestinations,
      aviableOffers: this.#aviableOffers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointAddComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointAddComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: null, ...point},
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
