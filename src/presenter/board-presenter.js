import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripView from '../view/trip-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import {render} from '../render.js';
import {mockDestinations} from '../mock/points.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({boardContainer, dataModel}) {
    this.boardContainer = boardContainer;
    this.dataModel = dataModel;
  }

  init() {
    this.boardPoints = [...this.dataModel.getPoints()];
    this.aviableDestinations = mockDestinations;

    render(new EditPointView(this.dataModel.getPoint(), this.aviableDestinations), this.boardContainer);
    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new TripView(this.boardPoints[i], this.aviableDestinations), this.tripListComponent.getElement());
    }

    render(new AddNewPointView(this.dataModel.getNewPoint(), this.aviableDestinations), this.boardContainer);
  }
}
