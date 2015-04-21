import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const ActionTypes = AppConstants.ActionTypes;
const CHANGE_EVENT = 'change';
let stories = [];
let filterText = '';

const HNStories = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  filteredStrories() {
    return stories.filter(story => {
      return !filterText ||
        story.title.toLowerCase().indexOf(filterText) !== -1 ||
        story.by.toLowerCase().indexOf(filterText) !== -1
        ;
    });
  }
});

HNStories.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.RECEIVE_STORY:
      stories = stories.concat([action.story]);
      HNStories.emitChange();
      break;
    case ActionTypes.RECEIVE_FILTER_TEXT:
      filterText = action.text.toLowerCase();
      HNStories.emitChange();
      break;
  }
});

export default HNStories;
