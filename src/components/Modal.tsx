import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.section`
  position: fixed;
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
  border-radius: 5px;

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

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: Props) => (
  <ModalWrapper onClick={props.onClose}>
    <ModalContent>
      {props.children}
      <ButtonArea>
        <CloseButton onClick={props.onClose}>close</CloseButton>
      </ButtonArea>
    </ModalContent>
  </ModalWrapper>
);

export default Modal;
