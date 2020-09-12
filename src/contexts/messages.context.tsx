import React, { useState, useEffect, useRef, createContext } from "react";
import io from "socket.io-client";

export const MessagesContext = createContext<{
  getRoomMessages: () => { room: string; name: string; content: string }[];
} | null>(null);

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

  useEffect(() => {
    // connect to socket io backend
    socketRef.current = io.connect("localhost:5000");

    // set name on backend
    socketRef.current.emit("setUsername", { name: "kaem" });

    // listening for events
    socketRef.current.on(
      "adminMessage",
      (data: { name: string; content: string; room: string }) => {
        setCommunication((prevMessages) => [...prevMessages, data]);
        console.log("here is a new message")
      }
    );
  }, []);

  return (
    <MessagesContext.Provider value={{ getRoomMessages }}>
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
