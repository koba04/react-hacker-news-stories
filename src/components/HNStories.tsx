import React, { memo, useMemo } from "react";
import HNStory from "./HNStory";
import { filterStories, Story } from "../hackerNews";
import { useStoriesResource } from "./../hackerNewsResource";

interface Props {
  className?: string;
  stories: Story[];
  onClickComment: (story: Story) => void;
}

const HNStoriesWithResource = (props: {
  count: number;
  filterText: string;
  onClickComment: (story: Story) => void;
}) => {
  const { data: stories } = useStoriesResource(props.count);
  const filteredStories = useMemo(
    () => filterStories(stories!, props.filterText),
    [stories, props.filterText]
  );
  return (
    <HNStories
      stories={filteredStories}
      onClickComment={props.onClickComment}
    />
  );
};

const HNStories = memo((props: Props) => {
  return (
    <section className={props.className}>
      {props.stories.map(story => (
        <HNStory
          key={story.id}
          story={story}
          onClickComment={props.onClickComment}
        />
      ))}
    </section>
  );
});

export default HNStoriesWithResource;
