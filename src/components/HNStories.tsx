import React from "react";
import HNStory from "./HNStory";
import { Story, filterStories } from "../hackerNews";
import { storiesResource, commentsResource } from "../hackerNewsResource";

interface Props {
  className?: string;
  stories: Story[];
  onClickComment: (story: Story) => void;
}

interface HNStoriesWithResourceProps {
  className?: string;
  onClickComment: (story: Story) => void;
  filterText: string;
  count: number;
}

const HNStoriesWithResource = (props: HNStoriesWithResourceProps) => {
  const { filterText, count, ...rest } = props;
  const stories = storiesResource.read(count);
  if (stories.length > 0) {
    commentsResource.preload(stories[0].kids);
  }
  const filteredStories = filterStories(stories, filterText);
  return <HNStories stories={filteredStories} {...rest} />;
};

const HNStories = (props: Props) => {
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
};

export default HNStoriesWithResource;
