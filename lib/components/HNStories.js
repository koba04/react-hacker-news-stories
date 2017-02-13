import React from 'react';
import HNStory from './HNStory';

export default function HNStories(props) {
  return (
    <div>
      {props.stories.map(story => <HNStory key={story.id} story={story} />)}
    </div>
  );
}
HNStories.propTypes = {
  stories: React.PropTypes.array.isRequired,
};
