import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Suspense fallback="loading..." maxDuration={5000}>
    <App count={100} />
  </Suspense>
);
