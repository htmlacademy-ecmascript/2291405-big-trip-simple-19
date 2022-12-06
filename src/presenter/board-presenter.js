import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripView from '../view/trip-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import {render} from '../render.js';


export default class BoardPresenter {
    tripListComponent = new TripListView();
  
    constructor({boardContainer}) {
      this.boardContainer = boardContainer;
    }
  
    init() {
        render(new EditPointView(), this.boardContainer);   
        render(new SortView(), this.boardContainer);
        render(this.tripListComponent, this.boardContainer);

        for (let i = 0; i < 3; i++) {
            render(new TripView(), this.tripListComponent.getElement());
        }
        
        render(new AddNewPointView(), this.boardContainer);        
    }
}