import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import Loading from "./components/Loading";

createRoot(document.getElementById("app") as HTMLDivElement).render(
  <Suspense fallback={<Loading />}>
    <App count={100} />
  </Suspense>
);
