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
  #aviableDestinations = null;
  #aviableOffers = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #handleModeChange = null;
  #handleDataChange = null;

  constructor({tripListContainer, aviableDestinations, aviableOffers, onModeChange, onDataChange}) {
    this.#tripListContainer = tripListContainer;
    this.#aviableDestinations = aviableDestinations;
    this.#aviableOffers = aviableOffers;

    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripView({
      point: this.#point,
      aviableDestinations: this.#aviableDestinations,
      aviableOffers: this.#aviableOffers,
      onEditClick: this.#hanleEditClick,
    });

    this.#pointEditComponent = new EditPointView({
      point,
      aviableDestinations: this.#aviableDestinations,
      aviableOffers: this.#aviableOffers,
      onFormSubmit: this.#handleFormSubmit,
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
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToListItem();
    }
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

  // проверка, попадают ли новые данные в фильтры 7.6
  #handleFormSubmit = (point) => {
    const isPatchUpdate = isPlannedDate(point.dateFrom);

    this.#replaceFormToListItem();
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

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToListItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
