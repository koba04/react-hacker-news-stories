import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Loading from "./components/Loading";

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App count={100} />
  </Suspense>,
  document.getElementById("app")
);
