import React from "react";
import styled from "styled-components";

import HNStories from "./HNStories";
import InputFilter from "./InputFilter";
import { Story, filterStories, fetchHackerNews } from "../hackerNews";

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
  }
  componentDidMount() {
    fetchHackerNews(this.props.count).then(stories =>
      this.setState({ stories })
    );
  }
  handleFilter(input: string) {
    this.setState({ filterText: input });
  }
  render() {
    const filteredStories = filterStories(
      this.state.stories,
      this.state.filterText
    );
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
          <HNStories stories={filteredStories} />
        </ListBox>
      </Main>
    );
  }
}
export default App;
