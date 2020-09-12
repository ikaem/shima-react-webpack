import React, { useContext } from "react";

import CommunicationHeader from "../components/communication-header.component";
import CommunicationMessage from "../components/communication-message.component";
import CommunicationNewMessage from "../components/communication-new-message.component";

import { MessagesContext } from "../contexts/messages.context";

const Communication: React.FC = () => {
  const { getRoomMessages } = useContext(MessagesContext) as {
    getRoomMessages: () => { room: string; name: string; content: string }[];
  };

  console.log(getRoomMessages());

  return (
    <main className="row-span-2 flex flex-col h-full">
      <CommunicationHeader />

      <div className="custom-scrollbar overflow-y-scroll bg-message-box-pattern h-full w-full p-4">
        <ul className="w-full flex flex-col justify-start sm:w-10/12 sm:mx-auto">
          {/* {new Array(6).fill("").map((val, index) => (
            <CommunicationMessage key={index} />
          ))} */}

          {getRoomMessages().map((val, index) => (
            <CommunicationMessage name={val.name} content={val.content} key={index} />
          ))}
        </ul>
      </div>

      <CommunicationNewMessage />
    </main>
  );
};

export default Communication;
