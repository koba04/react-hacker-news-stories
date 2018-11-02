import React from "react";
import styled from "styled-components";
import { Story } from "../hackerNews";

const StoryBox = styled.div`
  display: flex;
  flex-basis: 900px;
`;

const Rank = styled.div`
  font-size: 2em;
  flex-basis: 50px;
  text-align: center;
  padding: 5px;
`;

const Title = styled.div`
  font-size: 1.2em;
  align-self: center;
  flex-basis: 550px;
`;

const InfoBox = styled.div`
  margin: 5px;
  align-self: center;
`;

const InfoItem = styled.span`
  margin: "0 5px";
`;

interface Props {
  story: Story;
}

const HNStory = (props: Props) => {
  const { rank, url, title, by, kids } = props.story;
  const commentCount = kids ? kids.length : 0;
  return (
    <StoryBox>
      <Rank>{rank}</Rank>
      <Title>{title}</Title>
      <InfoBox>
        <InfoItem>>by {by}</InfoItem>
        <InfoItem>
          {commentCount}
          comments
        </InfoItem>
        <InfoItem>
          <a href={url} rel="noopener noreferrer" target="_blank">
            link
          </a>
        </InfoItem>
      </InfoBox>
    </StoryBox>
  );
};
export default HNStory;
