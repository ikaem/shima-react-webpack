import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/main.css";

import App from "./app";
import MessagesProvider from "./contexts/messages.context";

ReactDOM.render(
  <Router>
    <MessagesProvider>
      <App />
    </MessagesProvider>
  </Router>,
  document.getElementById("root")
);
