import React from "react";

import Layout from "./components/layout.component";
import MessagesProvider from "./contexts/messages.context";

import Login from "./pages/login.page";
import Chat from "./pages/chat.page";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <MessagesProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/new-room">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </MessagesProvider>
  );
};

export default App;
