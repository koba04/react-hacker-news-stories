import React from "react";

declare module "react-dom" {
  interface Root {
    render: (reactElement: React.ReactElement<any>) => void;
  }
  function createRoot(rootElement: HTMLElement | null): Root;
}
