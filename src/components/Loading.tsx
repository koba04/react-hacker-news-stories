import React from "react";
import styled, { keyframes } from "styled-components";

const opacity = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoadingContent = styled.div`
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;
  animation: ${opacity} 2s linear infinite;
`;

const Loading = () => <LoadingContent>Loading...</LoadingContent>;

export default Loading;
