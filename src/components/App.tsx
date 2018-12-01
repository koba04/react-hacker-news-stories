import React, { lazy, Suspense } from "react";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { HNCommentType } from "./HNComment";
import { Story, fetchHackerNewsComments, Comment } from "../hackerNews";
import Header from "./Header";
import Modal from "./Modal";
import Prerender from "./Prerender";
import Loading from "./Loading";

const HNComment = lazy<HNCommentType>(() => import("./HNComment"));

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
  commentIds: number[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: "",
      commentIds: []
    };
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.handleUpdateFilterText = this.handleUpdateFilterText.bind(this);
  }
  handleUpdateComment(commentIds: number[]) {
    this.setState({ commentIds });
  }
  handleUpdateFilterText(filterText: string) {
    this.setState({ filterText });
  }
  render() {
    const { commentIds, filterText } = this.state;

    const onClickComment = (story: Story) => {
      this.handleUpdateComment(story.kids);
    };

    return (
      <Container>
        <Main>
          <Header title="HackerNews Stories">
            <InputContainer
              value={filterText}
              onChange={this.handleUpdateFilterText}
            />
          </Header>
          <HNStories
            count={this.props.count}
            filterText={filterText}
            onClickComment={onClickComment}
          />
          <Prerender visible={commentIds.length > 0}>
            <Modal onClose={() => this.handleUpdateComment([])}>
              <Suspense fallback={<Loading />}>
                <HNComment commentIds={commentIds} />
              </Suspense>
            </Modal>
          </Prerender>
        </Main>
      </Container>
    );
  }
}
export default App;
