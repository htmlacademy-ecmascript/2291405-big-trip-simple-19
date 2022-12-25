import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripView from '../view/trip-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../render.js';
import {mockDestinations} from '../mock/points.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #aviableDestinations = [];
  #boardPoints = [];

  #tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#aviableDestinations = mockDestinations;
    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointComponent = new TripView(point, this.#aviableDestinations);
    const pointEditComponent = new EditPointView(point, this.#aviableDestinations);

    const replaceListItemToForm = () => {
      this.#tripListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToListItem = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToListItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const closeEditFormHandler = (evt) => {
      evt.preventDefault();
      replaceFormToListItem();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceListItemToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      closeEditFormHandler(evt);
    });

    pointEditComponent.element.closest('form').addEventListener('submit', (evt) => {
      closeEditFormHandler(evt);
    });

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
