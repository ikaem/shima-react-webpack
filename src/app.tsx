import React, { useState } from "react";
import MessagesProvider from "./contexts/messages.context";
import { gql, useQuery } from "@apollo/client";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout.component";
import Join from "./pages/join.page";
import Chat from "./pages/chat.page";

import { LoggedUserInterface } from "./apollo/apollo-client";

export const LOGGED_USER_LOCAL = gql`
  query LoggedUserLocal {
    loggedUser @client {
      _id
      name
      email
    }
  }
`;

const App: React.FC = () => {
  const [loggedUser2, setLoggedUser] = useState<string>("");

  // apollo client

  const {
    loading: loggedUserLoading,
    error: loggedUserError,
    data: loggedUserData,
  } = useQuery<{ loggedUser: LoggedUserInterface }>(LOGGED_USER_LOCAL);

  const { loggedUser } = loggedUserData as { loggedUser: LoggedUserInterface };

  console.log("logged user from app.js", loggedUser);

  return (
    <Layout>
      <Switch>
        <Route path="/join" exact>
          <Join setLoggedUser={setLoggedUser} />
        </Route>
        <Route path="/chat">
          <MessagesProvider loggedUser={loggedUser.name}>
            <Chat />
          </MessagesProvider>
        </Route>
        <Route>
          <Redirect to="/join" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
