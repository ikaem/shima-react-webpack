import React from "react";
import ReactDOM from "react-dom";

import "./assets/styles/main.css";

import App from "./app";
import MessagesProvider from "./contexts/messages.context";

ReactDOM.render(
  <MessagesProvider>
    <App />
  </MessagesProvider>,
  document.getElementById("root")
);
