import React from 'react';
import HNStory from './HNStory';

class HNStories extends React.Component {
  static get propTypes() {
    return {
      stories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
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
