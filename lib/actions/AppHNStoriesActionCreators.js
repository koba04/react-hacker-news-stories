import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const ActionTypes = AppConstants.ActionTypes;

const Action = {
  fetch(count) {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => res.json())
    .then((ids) => {
      ids.slice(0, count).forEach((id, index) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(res => res.json())
        .then((story) => {
          story.rank = index + 1;
          AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_STORY,
            story,
          });
        });
      });
    });
  },
  changeFilterText(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_FILTER_TEXT,
      text,
    });
  },
};

export default Action;
