import React from "react";

import Header from "./containers/header.container";
import Communication from "./containers/communication.container";
import Contacts from "./containers/contacts.container";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div className="green-ribbon fixed bg-teal-500 h-32 w-full top-0" />
      <div className="app-container grid grid-cols-app-mobile sm:grid-cols-app-desktop grid-rows-app mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 h-screen">
        <Header />

        <Switch>
          <Route path="/room/:id">
            <Communication />
          </Route>
          <Route path="/" exact>
            <h1>Create room</h1>
          </Route>
        </Switch>
        <Contacts />
      </div>

      {/* <Switch>
        <Route path="/" exact>
          <h1>Hello</h1>
        </Route>
        <Route path="/me" exact>
          <h1>Hello me</h1>
        </Route>
      </Switch> */}
    </>
  );
};

export default App;
