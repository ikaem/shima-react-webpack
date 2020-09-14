import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import CommunicationHeader from "../components/communication-header.component";
import CommunicationMessage from "../components/communication-message.component";
import CommunicationNewMessage from "../components/communication-new-message.component";

import { MessagesContext } from "../contexts/messages.context";

const Communication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<{ name: string; content: string }[]>(
    []
  );

  const { getRoomMessages } = useContext(MessagesContext) as {
    getRoomMessages: () => { room: string; name: string; content: string }[];
  };

  const { getRoomMessagesObject } = useContext(MessagesContext) as {
    getRoomMessagesObject: (a: string) => { name: string; content: string }[];
  };

  const { sendMessage } = useContext(MessagesContext) as {
    sendMessage: (a: string, b: string) => void;
  };

  const { loggedUser } = useContext(MessagesContext) as { loggedUser: string }

  useEffect(() => {
    try {
      // console.log("hello", getRoomMessagesObject(id));
      setMessages(getRoomMessagesObject(id));
    } catch (error) {
      console.log(error);
    }

    // setMessages(getRoomMessagesObject(id));
  }, [id, getRoomMessagesObject]);

  const handleNewMessage = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.charCode !== 13 || !newMessageRef.current) return;
    e.preventDefault();
    // console.log(newMessageRef.current.value);


    sendMessage(id, newMessageRef.current.value);
    (newMessageRef.current as HTMLTextAreaElement).value = "";
  };

  return (
    <main className="row-span-2 flex flex-col h-full">
      <CommunicationHeader roomName={id} />

      <div className="custom-scrollbar overflow-y-scroll bg-message-box-pattern h-full w-full p-4">
        <ul className="w-full flex flex-col justify-start sm:w-10/12 sm:mx-auto">
          {messages.map((val, index) => {
            // console.log("this is messages:", messages);
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
