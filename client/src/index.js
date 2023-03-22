import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import MainApp from "./router/MainApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <MainApp />
    </QueryClientProvider>
  </React.StrictMode>
);
