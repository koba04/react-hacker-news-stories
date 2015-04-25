import React from 'react';

class HNStory extends React.Component {
  static get propTypes() {
    return {
      story: React.PropTypes.object.isRequired
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.story !== nextProps.story;
  }
  render() {
    const {rank, title, by, url} = this.props.story;
    return <div>{rank}:{title} by {by} <a href={url}>link</a></div>;
  }
}

export default HNStory;
