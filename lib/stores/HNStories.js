import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const ActionTypes = AppConstants.ActionTypes;

class HNStories extends ReduceStore {
  getInitialState() {
    return {
      stories: [],
      filterText: '',
    };
  }
  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.RECEIVE_STORY:
        return {
          filterText: state.filterText,
          stories: state.stories
            .concat([action.story])
            .sort((a, b) => a.rank - b.rank),
        };
      case ActionTypes.RECEIVE_FILTER_TEXT:
        return {
          filterText: action.text.toLowerCase(),
          stories: state.stories,
        };
      default:
        return state;
    }
  }
  filteredStrories() {
    const {stories, filterText} = this.getState();
    return stories.filter(story => (
      !filterText ||
      story.title.toLowerCase().indexOf(filterText) !== -1 ||
      story.by.toLowerCase().indexOf(filterText) !== -1
    ));
  }
}

export default new HNStories(AppDispatcher);
