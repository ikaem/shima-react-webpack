import React, { useState } from "react";
import MessagesProvider from "./contexts/messages.context";

import Layout from "./components/layout.component";

import Join from "./pages/join.page";
import Chat from "./pages/chat.page";
import { Switch, Route, Redirect } from "react-router-dom";

const App: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<string>("");


  return (
    <Layout>
      <Switch>
        <Route path="/join" exact>
          <Join setLoggedUser={setLoggedUser} />
        </Route>
        <Route path="/chat">
          <MessagesProvider loggedUser={loggedUser}>
            <Chat />
          </MessagesProvider>
        </Route>
        {!loggedUser && <Redirect to="/join" />}
      </Switch>
    </Layout>
  );
};

export default App;
