import React, { useState, useEffect, useRef, createContext } from "react";
import io from "socket.io-client";

export const MessagesContext = createContext<{
  getRoomMessages: () => { room: string; name: string; content: string }[];
  getRoomMessagesObject: (a: string) => { name: string; content: string }[];
  communicationList: {
    room: string;
    lastMessage: {
      author: string;
      content: string;
    };
  }[];
} | null>(null);

/* 

        communicationList = communicationObjects.map((commObj) => {
          return {
            room: commObj.room,
            lastMessage: {
              author: commObj.messages[-1].name,
              content: commObj.messages[-1].content,
            },
          };
        }),


*/

const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<SocketIOClient.Socket>();

  const [communication, setCommunication] = useState<
    { name: string; content: string; room: string }[]
  >([]);

  const getRoomMessages = (room = "lobby") => {
    const roomMessages = communication.filter((message) => {
      return message.room === room;
    });

    return roomMessages;
  };

  // setting state for communication objects...
  const [communicationObjects, setCommunicationObjects] = useState<
    { room: string; messages: { name: string; content: string }[] }[]
  >([]);

  const getRoomMessagesObject = (room: string) => {
    const roomMessages = communicationObjects.find((object) => {
      return object.room === room;
    }) as {
      room: string;
      messages: {
        name: string;
        content: string;
      }[];
    };

    return roomMessages.messages;
  };

  // just random name creator
  const randomizer = () => {
    return Date.now();
  };

  useEffect(() => {
    // use effect for connecting to socketio
    // connect to socket io backend
    socketRef.current = io.connect("localhost:5000");

    // join room on backend
    socketRef.current.emit(
      "join",
      { name: `kaem${randomizer()}`, room: "lobby" },
      (data: { error: string }) => console.log("this is the error:", data)
    );

    // listening for events
    socketRef.current.on(
      "adminMessage",
      (data: { name: string; content: string; room: string }) => {
        setCommunication((prevMessages) => {
          // console.log("prev messages", prevMessages);
          return [...prevMessages, data];
        });

        console.log("here is a new message", data);
      }
    );
  }, []);

  // just for testing, to assign communication obhects state...
  useEffect(() => {
    const commObjects = [
      {
        room: "random",
        messages: [
          { name: "kaem", content: "Hello message" },
          { name: "ted", content: "Hello message 2" },
          { name: "ted", content: "Hello message 3" },
        ],
      },
      {
        room: "mark",
        messages: [
          { name: "mark", content: "Hello message" },
          { name: "kaem", content: "Hello message 2" },
        ],
      },
      {
        room: "john",
        messages: [
          { name: "john", content: "Hello message" },
          { name: "kaem", content: "Hello message 2" },
        ],
      },
      { room: "bday", messages: [{ name: "angie", content: "Hello message" }] },
      {
        room: "football",
        messages: [{ name: "john", content: "Hello message" }],
      },
      {
        room: "carry",
        messages: [{ name: "carry", content: "Hello message" }],
      },
      {
        room: "angie",
        messages: [
          { name: "kaem", content: "Hello message" },
          { name: "angie", content: "Hello message 2" },
        ],
      },
    ];

    setCommunicationObjects((prevObjects) => {
      return [...prevObjects, ...commObjects];
    });

    commObjects.forEach(({ room }) => {
      // console.log("is socket end curren true:",socketRef.current)

      // join room on backend
      socketRef.current &&
        socketRef.current.emit(
          "join",
          { name: `kaem${randomizer()}`, room: room },
          (data: { error: string }) => console.log("this is the error:", data)
        );
    });
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        getRoomMessagesObject,
        getRoomMessages,
        communicationList: communicationObjects.map((commObj) => {
          return {
            room: commObj.room,
            lastMessage: {
              author: commObj.messages[commObj.messages.length - 1].name,
              content: commObj.messages[commObj.messages.length - 1].content,
            },
          };
        }),
      }}
    >
      {children}
      <ul>
        {getRoomMessages().map((message, index) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
