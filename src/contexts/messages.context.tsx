import React, { useState, useEffect, useRef, createContext } from "react";
import io from "socket.io-client";

export const MessagesContext = createContext<{
  loggedUser: string;
  getRoomMessages: () => { room: string; name: string; content: string }[];
  getRoomMessagesObject: (a: string) => { name: string; content: string }[];
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
  communicationList: {
    room: string;
    seen: boolean;
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

interface MessagesProvideProps {
  children: React.ReactNode;
  loggedUser: string;
}

const MessagesProvider: React.FC<MessagesProvideProps> = ({
  children,
  loggedUser,
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
    {
      room: string;
      seen: boolean;
      messages: { name: string; content: string }[];
    }[]
  >([]);

  const setCommObjectRead = (roomName: string) => {
    // const currentRoom = communicationObjects.find((room) => {
    //   return room.room === roomName;
    // });

    // console.log("currentROom", currentRoom);

    // if (!currentRoom) return;

    // const currentRoomIndex = communicationObjects.findIndex((room) => {
    //   return room.room === roomName;
    // });

    // console.log("currentRoomIndex", currentRoomIndex)

    // const newCurentRoom = {
    //   ...currentRoom,
    //   seen: true,
    // }

    // setCommunicationObjects(prevObj => {
    //   const newObjects = [...prevObj];
    //   newObjects[currentRoomIndex] = newCurentRoom;

    //   return newObjects
    // })

    console.log("is this called");
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

    console.log("commObjects", communicationObjects);
  };

  const getRoomMessagesObject = (room: string) => {
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

    return roomMessages.messages;
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

    const joinResponse: { roomName: string, error: string } = await new Promise(resolve => socketRef.current?.emit("join", { name: loggedUser, room: roomName}, (callbackResponse: PromiseLike<{ roomName: string, error: string }> | undefined ) => resolve(callbackResponse)))

    return joinResponse;
  };

  useEffect(() => {
    setCommunication((prev) => [
      ...prev,
      { name: "test", content: "test content", room: "test room" },
    ]);

    // use effect for connecting to socketio
    // connect to socket io backend
    socketRef.current = io.connect("localhost:5000");

    // join room on backend
    socketRef.current.emit(
      "join",
      { name: loggedUser, room: "lobby" },
      (data: { error: string }) => console.log("this is the error:", data)
    );

    // // listening for events
    // socketRef.current.on(
    //   "adminMessage",
    //   (data: { name: string; content: string; room: string }) => {
    //     setCommunication((prevMessages) => {
    //       // console.log("prev messages", prevMessages);
    //       return [...prevMessages, data];
    //     });

    //     // console.log("here is a new message", data);
    //   }
    // );
  }, []);

  // just for testing, to assign communication obhects state...
  useEffect(() => {
    const commObjects = [
      {
        room: "random",
        seen: false,
        messages: [
          { name: "kaem", content: "Hello message" },
          { name: "ted", content: "Hello message 2" },
          { name: "ted", content: "Hello message 3" },
        ],
      },
      {
        room: "mark",
        seen: false,
        messages: [
          { name: "mark", content: "Hello message" },
          { name: "kaem", content: "Hello message 2" },
        ],
      },
      {
        room: "john",
        seen: false,
        messages: [
          { name: "john", content: "Hello message" },
          { name: "kaem", content: "Hello message 2" },
        ],
      },
      {
        room: "bday",
        seen: false,
        messages: [{ name: "angie", content: "Hello message" }],
      },
      {
        room: "football",
        seen: false,
        messages: [{ name: "john", content: "Hello message" }],
      },
      {
        room: "carry",
        seen: false,
        messages: [{ name: "carry", content: "Hello message" }],
      },
      {
        room: "angie",
        seen: false,
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
          { name: loggedUser, room: room },
          (data: { error: string }) => console.log("this is the error:", data)
        );
    });
  }, []);

  useEffect(() => {
    //     const addToCommunicationObjects = (
    //       roomName: string,
    //       message: { name: string; content: string }
    //     ) => {

    //       const isRoomExist = communicationObjects.find((room) => {
    //         console.log("this is room object:", room);
    //         console.log("what...");
    //         return room.room === roomName;
    //       });

    //       console.log("this is comm objects", communicationObjects);

    //       console.log("is room exist?:", isRoomExist);

    //       if (!isRoomExist)
    //         return setCommunicationObjects((prevObjs) => {
    // console.log("prevObj:", prevObjs)

    //           return [{ room: roomName, messages: [message] }, ...prevObjs];
    //         });

    //       const newMessages = [...isRoomExist.messages, message];
    //       const newObj = {
    //         room: roomName,
    //         messages: newMessages,
    //       };

    //       setCommunicationObjects((prevObjs) => {
    //         const remainingObjs = prevObjs.filter((obj) => {
    //           return obj.room !== roomName;
    //         });

    //         return [newObj, ...remainingObjs];
    //       });
    //     };

    ////////// testing from here

    const addToCommunicationObjects = (
      roomName: string,
      message: { name: string; content: string }
    ) => {
      setCommunicationObjects((prevObjs) => {
        // console.log("inside set objects", prevObjs);

        const isRoomExist = prevObjs.find((room) => {
          // console.log("this is room object:", room);
          // console.log("what...");
          return room.room === roomName;
        });

        // console.log("this is comm objects", prevObjs);

        // console.log("is room exist?:", isRoomExist);

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

        // finding index here
        // const objIndex = prevObjs.findIndex((room) => {
        //   return room.room === roomName;
        // })

        // returning the same list with comm objects

        // const newComm = prevObjs.slice()

        // newComm[objIndex] = newObj
        //

        // returning new communicatio

        // return newComm;

        const remainingObjs = prevObjs.filter((obj) => {
          return obj.room !== roomName;
        });

        return [newObj, ...remainingObjs];
      });
    };

    //
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
          // console.log(
          //   "this is the room message coming back from the server:",
          //   data
          // );

          addToCommunicationObjects(data.room, data.message);
        }
      );

    socketRef.current &&
      socketRef.current.on(
        "adminMessage",
        (data: {
          room: string;
          message: {
            name: string;
            content: string;
          };
        }) => {
          // console.log(
          //   "this is the room admin message coming back from the server:",
          //   data
          // );

          addToCommunicationObjects(data.room, data.message);
        }
      );
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        getRoomMessagesObject,
        getRoomMessages,
        sendMessage,
        setCommObjectRead,
        addNewRoom,
        joinRoom,
        loggedUser,
        communicationList: communicationObjects.map((commObj) => {
          return {
            room: commObj.room,
            seen: commObj.seen,
            lastMessage: {
              author: commObj.messages[commObj.messages.length - 1].name,
              content: commObj.messages[commObj.messages.length - 1].content,
            },
          };
        }),
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
