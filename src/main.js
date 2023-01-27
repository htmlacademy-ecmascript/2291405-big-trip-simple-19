import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';


const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const sectionBoardElement = siteBodyElement.querySelector('.trip-events');
const siteControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: sectionBoardElement,
  pointsModel: pointsModel,
  filterModel: filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteControlsFiltersElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

render(newPointButtonComponent, siteBodyElement.querySelector('.trip-main'));


filterPresenter.init();
boardPresenter.init();
