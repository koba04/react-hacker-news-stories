import React from "react";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import {
  filterStories,
  fetchHackerNews,
  Story,
  fetchHackerNewsComments,
  Comment
} from "../hackerNews";
import HNComment from "./HNComment";
import Header from "./Header";
import Modal from "./Modal";
import Loading from "./Loading";

const Container = styled.main`
  min-height: 100vh;
  background-color: #f7f9fa;
`;

const Main = styled.section`
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
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
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.handleUpdateFilterText = this.handleUpdateFilterText.bind(this);
  }
  componentDidMount() {
    fetchHackerNews(this.props.count).then((stories: Story[]) =>
      this.setState({ stories })
    );
  }
  handleUpdateComment(comments: Comment[]) {
    this.setState({ comments });
  }
  handleUpdateFilterText(filterText: string) {
    this.setState({ filterText });
  }
  render() {
    const { comments, filterText, stories } = this.state;
    return (
      <Container>
        <Main>
          <Header title="HackerNews Stories">
            <InputContainer
              value={filterText}
              onChange={this.handleUpdateFilterText}
            />
          </Header>
          {stories.length === 0 ? (
            <Loading />
          ) : (
            <HNStories
              stories={filterStories(stories, filterText)}
              onClickComment={(story: Story) => {
                fetchHackerNewsComments(story.kids).then(
                  this.handleUpdateComment
                );
              }}
            />
          )}
          {comments.length > 0 && (
            <Modal onClose={() => this.handleUpdateComment([])}>
              <HNComment comments={comments} />
            </Modal>
          )}
        </Main>
      </Container>
    );
  }
}
export default App;
