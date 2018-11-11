import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  children: React.ReactNode;
}

const HeaderLayout = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const HeaderTitle = styled.h1`
  flex-grow: 1;
  margin: 10px;
`;

const Header = ({ title, children }: Props) => (
  <HeaderLayout>
    <HeaderTitle>{title}</HeaderTitle>
    {children}
  </HeaderLayout>
);

export default Header;
