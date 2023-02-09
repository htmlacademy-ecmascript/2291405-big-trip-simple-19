import {render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import TripView from '../view/trip-view.js';
import {UserAction, UpdateType} from '../const.js';
import {isPlannedDate} from '../utils/date.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #availableDestinations = null;
  #availableOffers = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #handleModeChange = null;
  #handleDataChange = null;

  constructor({tripListContainer, availableDestinations, availableOffers, onModeChange, onDataChange}) {
    this.#tripListContainer = tripListContainer;
    this.#availableDestinations = availableDestinations;
    this.#availableOffers = availableOffers;

    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripView({
      point: this.#point,
      availableDestinations: this.#availableDestinations,
      availableOffers: this.#availableOffers,
      onEditClick: this.#hanleEditClick,
    });

    this.#pointEditComponent = new EditPointView({
      point,
      availableDestinations: this.#availableDestinations,
      availableOffers: this.#availableOffers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToListItem();
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #replaceListItemToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToListItem() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #hanleEditClick = () => {
    this.#replaceListItemToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    const isPatchUpdate = isPlannedDate(point.dateFrom);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToListItem();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToListItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
