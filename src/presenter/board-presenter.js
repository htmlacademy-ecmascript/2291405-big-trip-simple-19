import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import {SortType} from '../const.js';
import {sortPriceUp, sortDateUp} from '../utils/point.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  #pointPresenters = new Map();

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #currentSortType = SortType.DATE_FROM;

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

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_FROM:
        this.#boardPoints.sort(sortDateUp);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPriceUp);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearTripList();
    this.#renderTripList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
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
    this.#renderPoints();
  }

  #clearTripList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    this.#renderSort();

    if (!this.#boardPoints.length) {
      this.#renderNoTrips();
      return;
    }

    this.#renderTripList();
  }
}
