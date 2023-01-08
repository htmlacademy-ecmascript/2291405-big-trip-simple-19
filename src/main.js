import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const sectionBoardElement = siteBodyElement.querySelector('.trip-events');
const siteControlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({boardContainer: sectionBoardElement, pointsModel});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteControlsFiltersElement);

boardPresenter.init();
