import React from "react";
import HNStory from "./HNStory";
import { Story } from "../hackerNews";

interface Props {
  stories: Story[];
}

const HNStories = (props: Props) => {
  return (
    <section>
      {props.stories.map(story => (
        <HNStory key={story.id} story={story} />
      ))}
    </section>
  );
};
export default HNStories;
