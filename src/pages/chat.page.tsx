import React from "react";

import Header from "../containers/header.container";
import Communication from "../containers/communication.container";
import Contacts from "../containers/contacts.container";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

const Chat: React.FC = () => {
  console.log(useRouteMatch());

  const { path, url } = useRouteMatch();

  return (
    <div className="app-container grid grid-cols-app-mobile sm:grid-cols-app-desktop grid-rows-app mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 h-screen">
      <Header />
      <Switch>
        <Route path={`${path}/room/:id`}>
          <Communication />
        </Route>
        <Route path={`${path}/`}>
          <h1>Create room</h1>
        </Route>
      </Switch>
      <Contacts />
    </div>
  );
};

export default Chat;

{
  /* <Header /> */
}

{
  /* <Switch>
        <Route path="/room/:id">
          <Communication />
        </Route>
        <Route path="/" exact>
          <h1>Create room</h1>
        </Route>
      </Switch>
      <Contacts /> */
}

/* 
            <h1>This is chat</h1>
      <br/>

      <Link to={`${url}/hello`}>To hello</Link>
      <Link to={`${url}/me`}>To me</Link>


        <Route path={`${path}/hello`} exact>
          <h1>Hello</h1>
        </Route>
        <Route path={`${path}/me`}>
          <h1>Hello me</h1>
        </Route>
      
      */
