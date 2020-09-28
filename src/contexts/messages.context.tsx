import React, { useState, useEffect, useRef, createContext } from "react";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import { query } from "express";

export const MessagesContext = createContext<{
  loggedUser: string;
  getRoomMessages: (a: string) => { name: string; content: string }[] | [];
  setCommObjectRead: (a: string) => void;
  sendMessage: (a: string, b: string) => void;
  addNewRoom: (
    a: string
  ) => Promise<
    | {
        roomName: string;
        error: string;
      }
    | undefined
  >;
  joinRoom: (
    a: string
  ) => Promise<
    | {
        roomName: string;
        error: string;
      }
    | undefined
  >;

  generateCommunicationList: () => {
    room: string;
    seen: boolean;
    lastMessage: {
      author: string;
      content: string;
    };
  }[];
} | null>(null);

interface MessagesProvideProps {
  children: React.ReactNode;
  loggedUser: string;
}

const MessagesProvider: React.FC<MessagesProvideProps> = ({
  children,
  loggedUser,
}) => {
  console.log("from xontext logged user", loggedUser);

  const socketRef = useRef<SocketIOClient.Socket>();

  // setting state for able to use chat
  const [canUseChat, setCanUseChat] = useState<boolean>(true);

  // setting state for communication objects...
  const [communicationObjects, setCommunicationObjects] = useState<
    {
      room: string;
      seen: boolean;
      messages: { name: string; content: string }[];
    }[]
  >([]);

  const setCommObjectRead = (roomName: string) => {
    setCommunicationObjects((prevObjs) => {
      const currentRoom = prevObjs.find((room) => {
        return room.room === roomName;
      });

      if (!currentRoom) return prevObjs;

      const currentRoomIndex = prevObjs.findIndex((room) => {
        return room.room === roomName;
      });

      const newObjects = [...prevObjs];

      newObjects[currentRoomIndex] = {
        ...currentRoom,
        seen: true,
      };

      return newObjects;
    });
  };

  const generateCommunicationList = () => {
    return communicationObjects.map((commObj) => {
      return {
        room: commObj.room,
        seen: commObj.seen,
        lastMessage: {
          author: commObj.messages[commObj.messages.length - 1].name,
          content: commObj.messages[commObj.messages.length - 1].content,
        },
      };
    });
  };

  const getRoomMessages = (room: string) => {
    const roomMessages = communicationObjects.find((object) => {
      return object.room === room;
    }) as {
      room: string;
      seen: boolean;
      messages: {
        name: string;
        content: string;
      }[];
    };

    // return roomMessages.messages;
    return roomMessages?.messages || [];
  };

  const sendMessage = (room: string, message: string) => {
    message = message.trim();

    socketRef.current?.emit("message", { name: loggedUser, room, message });
  };

  const addNewRoom = async (roomName: string) => {
    if (!socketRef.current) return;

    roomName = roomName.trim();

    const createResponse: {
      roomName: string;
      error: string;
    } = await new Promise((resolve) =>
      socketRef.current?.emit(
        "createRoom",
        { name: loggedUser, room: roomName },
        (
          response: PromiseLike<{ roomName: string; error: string }> | undefined
        ) => resolve(response)
      )
    );

    return createResponse;
  };

  const joinRoom = async (roomName: string) => {
    if (!socketRef.current) return;

    roomName = roomName.trim();

    const joinResponse: {
      roomName: string;
      error: string;
    } = await new Promise((resolve) =>
      socketRef.current?.emit(
        "join",
        { name: loggedUser, room: roomName },
        (
          callbackResponse:
            | PromiseLike<{ roomName: string; error: string }>
            | undefined
        ) => resolve(callbackResponse)
      )
    );

    // console.log("error joining room:", joinResponse);

    return joinResponse;
  };

  useEffect(() => {
    // connect to socket io backend
    // socketRef.current = io.connect("localhost:5000");

    console.log("logged user from use effect", loggedUser)

    if (!loggedUser) return setCanUseChat(false);

    socketRef.current = io.connect(process.env.API_ENDPOINT as string, {
      query: { username: loggedUser },
    });
    joinRoom("lobby").then((data) => {
      // if (data?.error) return setCanUseChat(false);
    });

    return () => {
      socketRef.current?.emit("disconnect", { name: loggedUser });
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // const commObjects = [
    //   {
    //     room: "random",
    //     seen: false,
    //     messages: [
    //       { name: "kaem", content: "Hello message" },
    //       { name: "ted", content: "Hello message 2" },
    //       { name: "ted", content: "Hello message 3" },
    //     ],
    //   },
    //   {
    //     room: "mark",
    //     seen: false,
    //     messages: [
    //       { name: "mark", content: "Hello message" },
    //       { name: "kaem", content: "Hello message 2" },
    //     ],
    //   },
    //   {
    //     room: "john",
    //     seen: false,
    //     messages: [
    //       { name: "john", content: "Hello message" },
    //       { name: "kaem", content: "Hello message 2" },
    //     ],
    //   },
    //   {
    //     room: "bday",
    //     seen: false,
    //     messages: [{ name: "angie", content: "Hello message" }],
    //   },
    //   {
    //     room: "football",
    //     seen: false,
    //     messages: [{ name: "john", content: "Hello message" }],
    //   },
    //   {
    //     room: "carry",
    //     seen: false,
    //     messages: [{ name: "carry", content: "Hello message" }],
    //   },
    //   {
    //     room: "angie",
    //     seen: false,
    //     messages: [
    //       { name: "kaem", content: "Hello message" },
    //       { name: "angie", content: "Hello message 2" },
    //     ],
    //   },
    // ];
    // setCommunicationObjects((prevObjects) => {
    //   return [...prevObjects, ...commObjects];
    // });
    // commObjects.forEach(({ room }) => {
    //   socketRef.current &&
    //     socketRef.current.emit(
    //       "join",
    //       { name: loggedUser, room: room },
    //       (data: { error: string }) => console.log("this is the error:", data)
    //     );
    // });
  }, []);

  useEffect(() => {
    // adding room messages from server to the state
    const addToCommunicationObjects = (
      roomName: string,
      message: { name: string; content: string }
    ) => {
      setCommunicationObjects((prevObjs) => {
        const isRoomExist = prevObjs.find((room) => {
          return room.room === roomName;
        });

        if (!isRoomExist)
          return [
            { room: roomName, seen: false, messages: [message] },
            ...prevObjs,
          ];

        const newMessages = [...isRoomExist.messages, message];
        const newObj = {
          room: roomName,
          seen: false,
          messages: newMessages,
        };

        const remainingObjs = prevObjs.filter((obj) => {
          return obj.room !== roomName;
        });

        return [newObj, ...remainingObjs];
      });
    };

    socketRef.current &&
      socketRef.current.on(
        "roomMessage",
        (data: {
          room: string;
          message: {
            name: string;
            content: string;
          };
        }) => {
          addToCommunicationObjects(data.room, data.message);
        }
      );

    // socketRef.current &&
    socketRef.current?.on(
      "adminMessage",
      (data: {
        room: string;
        message: {
          name: string;
          content: string;
        };
      }) => {
        addToCommunicationObjects(data.room, data.message);
      }
    );
  }, []);

  if (!canUseChat) return <Redirect to="/join" />;

  return (
    <MessagesContext.Provider
      value={{
        getRoomMessages,
        sendMessage,
        setCommObjectRead,
        addNewRoom,
        joinRoom,
        loggedUser,
        generateCommunicationList,
        // communicationList: communicationObjects.map((commObj) => {
        //   return {
        //     room: commObj.room,
        //     seen: commObj.seen,
        //     lastMessage: {
        //       author: commObj.messages[commObj.messages.length - 1].name,
        //       content: commObj.messages[commObj.messages.length - 1].content,
        //     },
        //   };
        // }),
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
