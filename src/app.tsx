import React from "react";

import Header from "./containers/header.container";
import Communication from "./containers/communication.container";
import Contacts from "./containers/contacts.container";

const App: React.FC = () => {

  return (
    <>
      <div className="green-ribbon fixed bg-teal-500 h-32 w-full top-0" />
      <div className="app-container grid grid-cols-app-mobile sm:grid-cols-app-desktop grid-rows-app mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 h-screen">
        <Header />
        <Communication />
        <Contacts />
      </div>
    </>
  );
};

export default App;