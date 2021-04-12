import React from "react";
import ReactDOM from "react-dom";
import "./styles/App.css";
import App from "./App";
import { ListProvider } from "./providers/ListProvider";

ReactDOM.render(
  <React.StrictMode>
    <ListProvider>
      <App />
    </ListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
