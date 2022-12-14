import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import DataModel from './model/point-model.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const sectionBoardElement = siteBodyElement.querySelector('.trip-events');
const siteControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const dataModel = new DataModel();
const boardPresenter = new BoardPresenter({boardContainer: sectionBoardElement, dataModel});

render(new FilterView(), siteControlsFiltersElement);

boardPresenter.init();
