import React, { lazy, useCallback, useState, Suspense } from "react";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { Story } from "../hackerNews";
import HNCommentType from "./HNComment";
import Header from "./Header";
import Modal from "./Modal";
import Loading from "./Loading";
import Prerender from "./Prerender";

const HNComment = lazy<typeof HNCommentType>(() => import("./HNComment"));

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

const defer = requestAnimationFrame;

const App = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const [commentIds, setCommentIds] = useState<number[]>([]);

  const onClickComment = useCallback((story: Story) => {
    defer(() => setCommentIds(story.kids));
  }, []);

  return (
    <Container>
      <Main>
        <Header title="HackerNews Stories">
          <InputContainer onChange={setFilterText} />
        </Header>
        <Suspense fallback={<Loading />} maxDuration={2000}>
          <HNStories
            count={props.count}
            filterText={filterText}
            onClickComment={onClickComment}
          />
        </Suspense>
        <Prerender visible={commentIds.length > 0}>
          <Modal onClose={() => setCommentIds([])}>
            <Suspense fallback={<Loading />} maxDuration={2000}>
              <HNComment commentIds={commentIds} />
            </Suspense>
          </Modal>
        </Prerender>
      </Main>
    </Container>
  );
};
export default App;
