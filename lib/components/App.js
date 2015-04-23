import React from 'react';
import HNStories from './HNStories';
import InputFilter from './InputFilter';

import HNStoriesStore from '../stores/HNStories';
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
  constructor(props) {
    super(props);
    this.state = {
      stories: HNStoriesStore.filteredStrories()
    }
  }
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
    HNStoriesStore.addChangeListener(this._onChange.bind(this));
    AppHNStoriesActionCreators.fetch(this.props.count);
  }
  componentWillUnmount() {
    HNStoriesStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange() {
    this.setState({ stories: HNStoriesStore.filteredStrories()});
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
          <HNStories stories={this.state.stories} />
        </div>
      </div>
    )
  }
}

export default App;
