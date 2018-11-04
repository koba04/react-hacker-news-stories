import React from "react";
import HNStory from "./HNStory";
import { Story } from "../hackerNews";

interface Props {
  className?: string;
  stories: Story[];
}

const HNStories = (props: Props) => {
  return (
    <section className={props.className}>
      {props.stories.map(story => (
        <HNStory key={story.id} story={story} />
      ))}
    </section>
  );
};
export default HNStories;
