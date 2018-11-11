import React from "react";
import styled from "styled-components";
import { Story } from "../hackerNews";

const StoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Rank = styled.div`
  font-size: 2em;
  flex: 0 0 60px;
  text-align: center;
  vertical-align: middle;
  padding: 5px;

  @media (max-width: 768px) {
    flex: 0 0 45px;
    padding-bottom: 0;
  }
`;

const Title = styled.div`
  font-size: 1.2em;
  align-self: center;
  flex: 1;
`;

const InfoBox = styled.div`
  padding: 5px;
  flex: 0 0 25%;
  word-wrap: break-word;
  align-self: center;
  @media (max-width: 768px) {
    flex: 100%;
    text-align: right;
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;

const InfoItem = styled.span`
  display: inline-block;
  padding: 0 2px;
`;

interface Props {
  story: Story;
  onClickComment: (story: Story) => void;
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
          {commentCount ? (
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                props.onClickComment(props.story);
              }}
            >
              {commentCount}
              comments
            </a>
          ) : (
            <span>
              {commentCount}
              comment
            </span>
          )}
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
export default React.memo(HNStory);
