import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, remove} from '../framework/render.js';
import {SortType} from '../const.js';
import {sortPriceDown, sortDateUp} from '../utils/point.js';
import {UserAction, UpdateType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #newPointPresenter = null;

  #pointPresenters = new Map();

  #tripListComponent = new TripListView();
  #emptyListComponent = null;
  #sortComponent = null;
  #currentSortType = SortType.DATE_FROM;
  #filterType = FilterType.EVERYTHING;

  constructor({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      tripListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType, data) => {
    //console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  createPoint() {
    this.#currentSortType = SortType.DATE_FROM; //????
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    remove(this.#sortComponent);
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DATE_FROM;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DATE_FROM:
        return filteredPoints.sort(sortDateUp);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPoints() {
    this.points.forEach((task) => this.#renderPoint(task));
  }

  #renderNoTrips() {
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  #renderBoard() {
    this.#renderSort();

    if (!this.points.length) {
      this.#renderNoTrips();
      return;
    }

    this.#renderTripList();
  }
}
