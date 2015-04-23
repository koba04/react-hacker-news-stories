import React from 'react';
import HNStory from './HNStory';

class HNStories extends React.Component {
  static get propTypes() {
    return {
      stories: React.PropTypes.array.isRequired
    }
  }
  render() {
    return (
      <div>
        {this.props.stories.map(story => <HNStory key={story.id} story={story} />)}
      </div>
    );
  }
}

export default HNStories;
