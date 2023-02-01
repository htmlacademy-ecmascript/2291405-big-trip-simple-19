import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import ErrorView from './view/error-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './services/points-api-service.js';
import AdditionalApiService from './services/additional-api-service.js';
import {END_POINT, AUTHORIZATION, ErrorType} from './const.js';
import AdditionalDataModel from './model/additional-data-model.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const sectionBoardElement = siteBodyElement.querySelector('.trip-events');
const siteControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const additionalDataModel = new AdditionalDataModel({
  additionalApiService: new AdditionalApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: sectionBoardElement,
  pointsModel: pointsModel,
  filterModel: filterModel,
  additionalDataModel: additionalDataModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteControlsFiltersElement,
  filterModel,
  pointsModel,
  additionalDataModel
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

const errorMessageComponent = new ErrorView({errorType: ErrorType.LOADING});
additionalDataModel.init()
  .then(() => {
    pointsModel.init().then(() => {
      filterPresenter.init();
      boardPresenter.init();
      render(newPointButtonComponent, siteBodyElement.querySelector('.trip-main'));
    }).catch(() => {
      render(errorMessageComponent, sectionBoardElement);
    });
  })
  .catch(() => {
    render(errorMessageComponent, sectionBoardElement);
  });
