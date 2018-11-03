// @ts-ignore
import React, { Suspense, useState } from "react";
// @ts-ignore
import { unstable_createResource as createResource } from "react-cache";
// import { scheduleCallback} from 'schedule';

import styled from "styled-components";

// import HNStories from "./HNStories";
import InputFilter from "./InputFilter";
import { filterStories, fetchHackerNews } from "../hackerNews";

// This is only for proof ofconcept for React.lazy
// @ts-ignore
const HNStories = React.lazy(() => import("./HNStories"));

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

const hackerNewsResource = createResource((count: number) =>
  fetchHackerNews(count)
);

// @ts-ignore
const HNStoriesResource = React.memo(
  (props: { count: number; filterText: string }) => {
    const stories = hackerNewsResource.read(props.count);
    const filteredStories = filterStories(stories, props.filterText);
    return <HNStoriesContainer stories={filteredStories} />;
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
