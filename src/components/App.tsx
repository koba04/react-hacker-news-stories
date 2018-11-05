import React, { lazy, useState, useEffect, Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { filterStories, fetchHackerNews, Story } from "../hackerNews";
import HNCommentType from "./HNComment";

const HNComment = lazy<typeof HNCommentType>(() => import("./HNComment"));

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

const fetchHackerNewsResource = createResource<Story[]>((count: number) => {
  return fetchHackerNews(count);
});

const HNStoriesWithResource = (props: {
  count: number;
  filterText: string;
  onClickComment: (story: Story) => void;
}) => {
  const stories = fetchHackerNewsResource.read(props.count);
  return (
    <HNStories
      stories={filterStories(stories, props.filterText)}
      onClickComment={props.onClickComment}
    />
  );
};

const defer = requestAnimationFrame;

const App = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const [inputFilterText, setInputFilterText] = useState("");
  const [commentIds, setCommentIds] = useState<number[]>([]);
  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [commentIds]
  );

  return (
    <Container>
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
      <Suspense fallback="Now Loading..." maxDuration={2000}>
        <HNStoriesWithResource
          count={props.count}
          filterText={filterText}
          onClickComment={(story: Story) => setCommentIds(story.kids)}
        />
      </Suspense>
      {commentIds.length > 0 && (
        <Suspense fallback="Loading!!!" maxDuration={2000}>
          <HNComment
            commentIds={commentIds}
            onClose={() => setCommentIds([])}
          />
        </Suspense>
      )}
    </Container>
  );
};
export default App;
