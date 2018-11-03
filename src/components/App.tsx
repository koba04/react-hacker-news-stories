import React from "react";
import styled from "styled-components";

import HNStories from "./HNStories";
import InputFilter from "./InputFilter";
import { Story, filterStories, fetchHackerNews } from "../hackerNews";

const Container = styled.main`
  margin: 0 auto;
`;

const Header = styled.header`
  max-width: 900px;
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const HeaderTitle = styled.h1`
  flex-grow: 1;
  margin: 10px;
`;

const InputContainer = styled(InputFilter)`
  flex-basis: 100px;
  align-self: right;
  margin: 10px;
`;

const HNStoriesContainer = styled(HNStories)`
  flex-basis: 900px;
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
      <Container>
        <Header>
          <HeaderTitle>HackerNews Stories</HeaderTitle>
          <InputContainer
            value={this.state.filterText}
            onChange={this.handleFilter}
          />
        </Header>
        <HNStoriesContainer stories={filteredStories} />
      </Container>
    );
  }
}
export default App;
