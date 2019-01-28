import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Loading from "./components/Loading";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Suspense fallback={<Loading />} maxDuration={2000}>
    <App count={100} />
  </Suspense>
);
