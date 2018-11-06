import React, {
  lazy,
  memo,
  useCallback,
  useState,
  useEffect,
  Suspense
} from "react";
import { unstable_createResource as createResource } from "react-cache";
import styled from "styled-components";

import InputFilter from "./InputFilter";
import HNStories from "./HNStories";
import { filterStories, fetchHackerNews, Story } from "../hackerNews";
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

const fetchHackerNewsResource = createResource<Story[]>((count: number) => {
  return fetchHackerNews(count);
});

const HNStoriesWithResource = memo(
  (props: {
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
  }
);

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

  const onClickComment = useCallback((story: Story) => {
    setCommentIds(story.kids);
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
        {commentIds.length > 0 && (
          <Modal onClose={() => setCommentIds([])}>
            <Suspense fallback={<Loading />} maxDuration={4000}>
              <HNComment commentIds={commentIds} />
            </Suspense>
          </Modal>
        )}
      </Main>
    </Container>
  );
};
export default App;