import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./router/MainApp";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
