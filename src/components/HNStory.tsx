import React from "react";
import styled from "styled-components";
import { Story } from "../hackerNews";

const StoryBox = styled.div`
  display: flex;
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
  padding: 5px;
  align-self: center;
`;

const InfoItem = styled.span`
  display: inline-block;
  padding: 0 2px;
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
        <InfoItem>by {by}</InfoItem>
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
// @ts-ignore
export default React.memo(HNStory);
