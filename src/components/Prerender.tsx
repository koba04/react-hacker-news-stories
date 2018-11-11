import React from "react";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

const Prerender = ({ children, visible }: Props) => (
  <div hidden={!visible}>{children}</div>
);

export default Prerender;
