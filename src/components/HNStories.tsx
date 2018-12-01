import React, { useMemo } from "react";
import HNStory from "./HNStory";
import { Story, filterStories } from "../hackerNews";
import { storiesResouce } from "../hackerNewsResource";

interface Props {
  className?: string;
  count: number;
  filterText: string;
  onClickComment: (story: Story) => void;
}

const HNStories = (props: Props) => {
  const stories = storiesResouce.read(props.count);
  const filteredStories = useMemo(
    () => filterStories(stories, props.filterText),
    [stories, props.filterText]
  );

  return (
    <section className={props.className}>
      {filteredStories.map(story => (
        <HNStory
          key={story.id}
          story={story}
          onClickComment={props.onClickComment}
        />
      ))}
    </section>
  );
};
export default HNStories;
