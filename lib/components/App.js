import React from 'react';
import HNStories from './HNStories';
import InputFilter from './InputFilter';

import AppHNStoriesActionCreators from '../actions/AppHNStoriesActionCreators';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 900
  },
  title: {
    flexBasis: 500,
    alignSelf: 'center',
    padding: 10
  },
  filter: {
    flexBasis: 400,
    alignSelf: 'center'

  },
  stories: {
    flexBasis: 900,
    alignSelf: 'center'
  }
};

class App extends React.Component {
  static get propTypes() {
    return {
      count: React.PropTypes.number
    }
  }
  static getDefaultProps() {
    return {
      count: 50
    }
  }
  componentDidMount() {
    AppHNStoriesActionCreators.fetch(this.props.count);
  }
  render() {
    return (
      <div style={style.root}>
        <div style={style.title}>
          <h1>HackerNews Stories</h1>
        </div>
        <div style={style.filter}>
          <InputFilter />
        </div>
        <div style={style.stories}>
          <HNStories />
        </div>
      </div>
    )
  }
}

export default App;
