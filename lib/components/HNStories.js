import React from 'react';
import HNStory from './HNStory';

import HNStoriesStore from '../stores/HNStories';

class HNStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: HNStoriesStore.filteredStrories()
    }
  }
  componentDidMount() {
    HNStoriesStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount() {
    HNStoriesStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange() {
    this.setState({ stories: HNStoriesStore.filteredStrories()});
  }
  render() {
    return (
      <div>
        {this.state.stories.map(story => <HNStory key={story.id} story={story} />)}
      </div>
    );
  }
}

export default HNStories;
