import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  #pointPresenters = new Map();

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
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent.element,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(new SortView(), this.#boardContainer);
  }

  #renderPoints() {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderNoTrips() {
    render(new EmptyListView(), this.#boardContainer);
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#boardContainer);
  }

  #renderBoard() {
    this.#renderSort();

    if (!this.#boardPoints.length) {
      this.#renderNoTrips();
      return;
    }

    this.#renderTripList();
    this.#renderPoints();
  }
}
