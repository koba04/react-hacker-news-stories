import React from "react";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import {
  filterStories,
  fetchHackerNews,
  fetchHackerNewsComments,
  Story,
  Comment
} from "../hackerNews";
import HNComment from "./HNComment";

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

interface Props {
  count: number;
}

interface State {
  filterText: string;
  stories: Story[];
  comments: Comment[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: "",
      stories: [],
      comments: []
    };
    this.onChangeFilterText = this.onChangeFilterText.bind(this);
  }
  componentDidMount() {
    fetchHackerNews(this.props.count).then(stories =>
      this.setState({ stories })
    );
  }
  onChangeFilterText(filterText: string) {
    this.setState({ filterText });
  }
  render() {
    const { stories, filterText, comments } = this.state;
    return (
      <Container>
        <Header>
          <HeaderTitle>HackerNews Stories</HeaderTitle>
          <InputContainer
            value={filterText}
            onChange={this.onChangeFilterText}
          />
        </Header>
        <HNStories
          stories={filterStories(stories, filterText)}
          onClickComment={(story: Story) => {
            fetchHackerNewsComments(story.kids).then(comments => {
              this.setState({ comments }, () => {
                window.scrollTo(0, 0);
              });
            });
          }}
        />
        {comments.length > 0 && (
          <HNComment
            onClose={() => this.setState({ comments: [] })}
            comments={comments}
          />
        )}
      </Container>
    );
  }
}
export default App;
