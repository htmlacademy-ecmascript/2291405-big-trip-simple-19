import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripView from '../view/trip-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render, replace} from '../framework/render.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  #tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToListItem.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripView({
      point,
      onEditClick: () => {
        replaceListItemToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormToListItem.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceFormToListItem() {
      replace(pointComponent, pointEditComponent);
    }

    function replaceListItemToForm() {
      replace(pointEditComponent, pointComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }

  #renderBoard() {
    render(new SortView(), this.#boardContainer);

    if (!this.#boardPoints.length) {
      render(new EmptyListView(), this.#boardContainer);
      return;
    }
    render(this.#tripListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }
}
