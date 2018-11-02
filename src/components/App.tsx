import React from "react";
import styled from "styled-components";

import HNStories from "./HNStories";
import InputFilter from "./InputFilter";
import { Story } from "../hackerNews";

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 900px;
`;

const Header = styled.header`
  flex-basis: 500px;
  align-self: center;
  padding: 10px;
`;

const InputBox = styled.div`
  flex-basis: 400px;
  align-self: center;
`;

const ListBox = styled.div`
  flex-basis: 900px;
  align-self: center;
`;

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
      <Main>
        <Header>
          <h1>HackerNews Stories</h1>
        </Header>
        <InputBox>
          <InputFilter
            value={this.state.filterText}
            onChange={this.handleFilter}
          />
        </InputBox>
        <ListBox>
          <HNStories stories={this.filterStories()} />
        </ListBox>
      </Main>
    );
  }
}
export default App;
