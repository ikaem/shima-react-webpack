import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import CommunicationHeader from "../components/communication-header.component";
import CommunicationMessage from "../components/communication-message.component";
import CommunicationNewMessage from "../components/communication-new-message.component";

import { MessagesContext } from "../contexts/messages.context";

const Communication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  // const [messages, setMessages] = useState<{ name: string; content: string }[]>(
  //   []
  // );

  const { loggedUser, sendMessage, getRoomMessages } = useContext(
    MessagesContext
  ) as {
    loggedUser: string;
    sendMessage: (a: string, b: string) => void;
    getRoomMessages: (a: string) => { name: string; content: string }[];
  };

  // useEffect(() => {
  //   // setting messages for indivual conversation
  //   try {
  //     setMessages(getRoomMessagesObject(id));
  //   } catch (error) {
  //     // make sure the error if is just logged if we jump to a particular conversation via url
  //     console.log(error);
  //   }
  // }, [id, getRoomMessagesObject]);

  const handleNewMessage = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || !newMessageRef.current) return;

    // console.log(e.key);
    e.preventDefault();

    sendMessage(id, newMessageRef.current.value);
    (newMessageRef.current as HTMLTextAreaElement).value = "";
  };

  return (
    <main className="row-span-2 flex flex-col h-full">
      <CommunicationHeader roomName={id} />
      <div className="custom-scrollbar overflow-y-scroll bg-message-box-pattern h-full w-full p-4">
        <ul className="w-full flex flex-col justify-start sm:w-10/12 sm:mx-auto">
          {/* {messages.map((val, index) => { */}
          {getRoomMessages(id).map((val, index) => {
            return (
              <CommunicationMessage
                name={val.name}
                loggedUser={loggedUser}
                content={val.content}
                key={index}
              />
            );
          })}
        </ul>
      </div>
      <CommunicationNewMessage
        newMessageRef={newMessageRef}
        handleNewMessage={handleNewMessage}
      />
    </main>
  );
};

export default Communication;
