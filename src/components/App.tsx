import React from "react";
import HNStories from "./HNStories";
import InputFilter from "./InputFilter";
import { Story } from "../hackerNews";

const style = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: 900
  },
  title: {
    flexBasis: 500,
    alignSelf: "center",
    padding: 10
  },
  filter: {
    flexBasis: 400,
    alignSelf: "center"
  },
  stories: {
    flexBasis: 900,
    alignSelf: "center"
  }
};

interface Props {
  count: number;
}

interface State {
  stories: Story[];
  filterText: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stories: [],
      filterText: ""
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.filterStories = this.filterStories.bind(this);
  }
  componentDidMount() {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(res => res.json())
      .then(ids => {
        ids.slice(0, this.props.count).forEach((id: number, index: number) => {
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
            .then(res => res.json())
            .then(story => {
              story.rank = index + 1;
              this.setState({
                stories: this.state.stories
                  .concat([story])
                  .sort((a, b) => a.rank - b.rank)
              });
            });
        });
      });
  }
  handleFilter(input: string) {
    this.setState({ filterText: input });
  }
  filterStories() {
    const filterText = this.state.filterText.toLowerCase();
    return this.state.stories.filter(
      story =>
        !filterText ||
        story.title.toLowerCase().indexOf(filterText) !== -1 ||
        story.by.toLowerCase().indexOf(filterText) !== -1
    );
  }
  render() {
    return (
      <div style={style.root as any}>
        <div style={style.title}>
          <h1>HackerNews Stories</h1>
        </div>
        <div style={style.filter}>
          <InputFilter
            value={this.state.filterText}
            onChange={this.handleFilter}
          />
        </div>
        <div style={style.stories}>
          <HNStories stories={this.filterStories()} />
        </div>
      </div>
    );
  }
}
export default App;
