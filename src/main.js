import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const sectionBoardElement = siteBodyElement.querySelector('.trip-events');
const siteControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: sectionBoardElement});

render(new FilterView(), siteControlsFiltersElement);

boardPresenter.init();