import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/styles/main.css";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apollo/apollo-client";
import App from "./app";

ReactDOM.render(
  <Router>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
