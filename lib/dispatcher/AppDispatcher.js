import {Dispatcher} from 'flux';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';

const PayloadSources = AppConstants.PayloadSources;

const AppDispatcher = assign(new Dispatcher(), {
  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    })
  }
});

export default AppDispatcher;
