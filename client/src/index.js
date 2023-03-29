import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/contextUser";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./router/MainApp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <MainApp />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
