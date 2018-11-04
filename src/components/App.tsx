import React, { Suspense, useState, memo } from "react";
import { unstable_createResource as createResource } from "react-cache";
// import { scheduleCallback} from 'schedule';

import styled from "styled-components";

import InputFilter from "./InputFilter";
import { filterStories, fetchHackerNews, Story } from "../hackerNews";

// This is only for proof ofconcept for React.lazy
import HNStories from "./HNStories";
const HNStoriesLazy = React.lazy<typeof HNStories>(() => import("./HNStories"));

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

const hackerNewsResource = createResource<Story[]>((count: number) =>
  fetchHackerNews(count)
);

const HNStoriesResource = memo(
  (props: { count: number; filterText: string }) => {
    const stories = hackerNewsResource.read(props.count);
    const filteredStories = filterStories(stories, props.filterText);
    return <HNStoriesLazy stories={filteredStories} />;
  }
);

const defer = requestAnimationFrame;

const App = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const [inputFilterText, setInputFilterText] = useState("");

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
      <Suspense fallback="loading..." maxDuration={2000}>
        <HNStoriesResource count={props.count} filterText={filterText} />
      </Suspense>
    </Container>
  );
};
export default App;
