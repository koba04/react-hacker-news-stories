import React from 'react/addons';
import HNStories from './HNStories';
import {} from 'whatwg-fetch';
import {List} from 'immutable';

const {Perf} = React.addons;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: List()
    }
  }
  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => res.json())
    .then(ids => {
      Perf.start();
      Promise.all(
        ids.slice(0, 50).map((id, index) => {
          return new Promise((resolve, reject) => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(res => res.json())
            .then(story => {
              story.rank = index + 1;
              this.setState({
                stories: this.state.stories.push(story).sort((a,b) => a.rank - b.rank)
              }, resolve)
            })
            .catch(reject)
          })
        })
      )
      .then(() => {
        Perf.stop();
        Perf.printDOM();
        Perf.printWasted();
      })

    })

  }
  render() {
    return (
      <div>
      <h1>HackerNewsStory</h1>
      <HNStories stories={this.state.stories} />
      </div>
    );
  }
}

export default App;
