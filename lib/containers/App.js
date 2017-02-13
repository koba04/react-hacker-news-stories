import React from 'react';
import {Container} from 'flux/utils';
import HNStories from '../components/HNStories';
import InputFilter from '../components/InputFilter';

import HNStoriesStore from '../stores/HNStories';
import AppHNStoriesActionCreators from '../actions/AppHNStoriesActionCreators';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 900,
  },
  title: {
    flexBasis: 500,
    alignSelf: 'center',
    padding: 10,
  },
  filter: {
    flexBasis: 400,
    alignSelf: 'center',

  },
  stories: {
    flexBasis: 900,
    alignSelf: 'center',
  },
};

class App extends React.Component {
  static getStores() {
    return [HNStoriesStore];
  }
  static calculateState(prevState) {
    const {filterText} = HNStoriesStore.getState();
    const filteredStories = HNStoriesStore.filteredStrories();
    return {
      filterText,
      filteredStories,
    };
  }
  componentDidMount() {
    AppHNStoriesActionCreators.fetch(this.props.count);
  }
  render() {
    const {filteredStories, filterText} = this.state;
    return (
      <div style={style.root}>
        <div style={style.title}>
          <h1>HackerNews Stories</h1>
        </div>
        <div style={style.filter}>
          <InputFilter
            value={filterText}
            onChange={AppHNStoriesActionCreators.changeFilterText}
          />
        </div>
        <div style={style.stories}>
          <HNStories stories={filteredStories} />
        </div>
      </div>
    );
  }
}
App.propTypes = {
  count: React.PropTypes.number,
};
App.defaultProps = {
  count: 50,
};

export default Container.create(App);
