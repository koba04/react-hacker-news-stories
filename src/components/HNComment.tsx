import React from "react";
import styled from "styled-components";

import { Comment } from "../hackerNews";

interface Props {
  comments?: Comment[];
  onClose: () => void;
}

const ModalWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 80%;
  max-height: 80%;
  overflow: scroll;

  padding: 20px;

  & > ul {
    list-style: none;
  }
`;

const ButtonArea = styled.div`
  text-align: center;
`;

const CloseButton = styled.button`
  display: inline-block;
  padding: 5px;
  font-size: 1.2rem;
  border-radius: 5px;

  &:hover {
    background-color: #eee;
  }
`;

const HNComment = ({ comments, onClose }: Props) => (
  <ModalWrapper onClick={onClose}>
    <ModalContent>
      <ul>
        {comments &&
          comments.map(comment => (
            <li key={comment.id}>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${comment.text} (by ${comment.by})`
                }}
              />
              <hr />
            </li>
          ))}
      </ul>
      <ButtonArea>
        <CloseButton onClick={onClose}>close</CloseButton>
      </ButtonArea>
    </ModalContent>
  </ModalWrapper>
);

export default HNComment;
