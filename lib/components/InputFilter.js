import React from 'react';

import HNStoriesStore from '../stores/HNStories';
import AppHNStoriesActionCreators from '../actions/AppHNStoriesActionCreators';

class InputFilter extends React.Component {
  onInput(e) {
    AppHNStoriesActionCreators.filter(e.target.value);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={this.onInput.bind(this)}
        />
      </div>
    )
  }
}

export default InputFilter;
