import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Loading from "./components/Loading";

ReactDOM.createRoot(document.getElementById("app") as HTMLDivElement).render(
  <Suspense fallback={<Loading />}>
    <App count={100} />
  </Suspense>
);
