import React from "react";
import HNStory from "./HNStory";
import { Story } from "../hackerNews";

interface Props {
  stories: Story[];
}

const HNStories = (props: Props) => {
  return (
    <div>
      {props.stories.map(story => (
        <HNStory key={story.id} story={story} />
      ))}
    </div>
  );
};
export default HNStories;
