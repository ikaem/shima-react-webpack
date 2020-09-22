import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Header from "../containers/header.container";
import Communication from "../containers/communication.container";
import Contacts from "../containers/contacts.container";
import NewRoom from "../components/communication-new-room.component";
import JoinRoom from "../components/communication-join-room.component";

const Chat: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="app-container grid grid-cols-app-mobile sm:grid-cols-app-desktop grid-rows-app mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 h-screen">
      <Header />
      <Switch>
        <Route path={`${path}/`} exact>
          <Redirect to={`${path}/room/lobby`} />
        </Route>
        <Route path={`${path}/room/:id`}>
          <Communication />
        </Route>
        <Route path={`${path}/new-room`}>
          <NewRoom />
        </Route>
        <Route path={`${path}/join-room`}>
          <JoinRoom />
        </Route>
      </Switch>
      <Contacts />
    </div>
  );
};

export default Chat;
