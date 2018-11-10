import React, { lazy, useMemo, useCallback, useState, Suspense } from "react";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { filterStories, Story } from "../hackerNews";
import { storiesResource } from "./../hackerNewsResource";
import HNCommentType from "./HNComment";
import Modal from "./Modal";
import Loading from "./Loading";

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

const Header = styled.header`
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

const HNStoriesWithResource = (props: {
  count: number;
  filterText: string;
  onClickComment: (story: Story) => void;
}) => {
  const stories = storiesResource.read(props.count);
  const filteredStories = useMemo(
    () => filterStories(stories, props.filterText),
    [stories, props.filterText]
  );
  return (
    <HNStories
      stories={filteredStories}
      onClickComment={props.onClickComment}
    />
  );
};

const defer = requestAnimationFrame;

const App = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const [inputFilterText, setInputFilterText] = useState("");
  const [commentIds, setCommentIds] = useState<number[]>([]);

  const onClickComment = useCallback((story: Story) => {
    defer(() => setCommentIds(story.kids));
  }, []);

  return (
    <Container>
      <Main>
        <Header>
          <HeaderTitle>HackerNews Stories</HeaderTitle>
          <InputContainer
            value={inputFilterText}
            onChange={value => {
              setInputFilterText(value);
              defer(() => setFilterText(value));
            }}
          />
        </Header>
        <Suspense fallback={<Loading />} maxDuration={2000}>
          <HNStoriesWithResource
            count={props.count}
            filterText={filterText}
            onClickComment={onClickComment}
          />
        </Suspense>
        <div hidden={commentIds.length === 0}>
          <Modal onClose={() => setCommentIds([])}>
            <Suspense fallback={<Loading />} maxDuration={2000}>
              <HNComment commentIds={commentIds} />
            </Suspense>
          </Modal>
        </div>
      </Main>
    </Container>
  );
};
export default App;
