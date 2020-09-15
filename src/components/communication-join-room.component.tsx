import React, { useRef, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { MessagesContext } from "../contexts/messages.context";

const JoinRoom: React.FC = () => {
  const joinedRoomInputRef = useRef<HTMLInputElement>(null);

  const { joinRoom } = useContext(MessagesContext) as {
    joinRoom: (
      a: string
    ) => Promise<{
      roomName: string;
      error: string;
    }>;
  };

  const [isJoined, setIsJoined] = useState<{
    status: boolean;
    message: string;
    joinedRoomRoute: string;
  }>({
    status: false,
    message: "",
    joinedRoomRoute: "",
  });

  const handleJoinedRoomSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // check if input empty
    if (!(joinedRoomInputRef.current as HTMLInputElement).value) return;

    const {
      roomName,
      error,
    }: { roomName?: string; error?: string } = (await joinRoom(
      (joinedRoomInputRef.current as HTMLInputElement).value
    )) as {
      roomName: string;
      error: string;
    };

    // if error, we just want to show the message

    if (error) {
      console.log("there is error", error);
      setIsJoined({
        status: false,
        message: error,
        joinedRoomRoute: "",
      });
      return;
    }

    // reroute to the actual joined room
    setIsJoined({
      status: true,
      message: "",
      joinedRoomRoute: roomName,
    });
  };

  return (
    <div className=" row-span-2 w-full bg-gray-200 py-32">
      <form
        onSubmit={handleJoinedRoomSubmit}
        className="flex flex-col w-8/12 px-4 mx-auto items-center h-32 justify-between"
      >
        <label htmlFor="" className="">
          Join room:
        </label>
        <input
          type="text"
          className="rounded-lg px-4 py-2 text-center outline-none text-gray-600"
          required
          ref={joinedRoomInputRef}
        />
        <button className="bg-green-300 py-2 px-8 rounded-lg outline-none">
          Join
        </button>
      </form>
      {isJoined.message && (
        <p className="mt-8 px-4 text-center text-orange-900">
          {isJoined.message}
        </p>
      )}
      {isJoined.status && (
        <Redirect to={`/chat/room/${isJoined.joinedRoomRoute}`} />
      )}
    </div>
  );
};

export default JoinRoom;
