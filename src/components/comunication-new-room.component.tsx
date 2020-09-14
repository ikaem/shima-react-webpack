import React, { useRef, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { MessagesContext } from "../contexts/messages.context";

const NewRoom: React.FC = () => {
  const newRoomInputRef = useRef<HTMLInputElement>(null);

  const { addNewRoom } = useContext(MessagesContext) as {
    addNewRoom: (
      a: string
    ) => Promise<{
      roomName: string;
      error: string;
    }>;
  };

  const [newRoomRoute, setNewRoomRoute] = useState<string>("");

  const handleNewRoomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if input empty

    if (!(newRoomInputRef.current as HTMLInputElement).value) return;

    // try {
    // } catch (error) {}
    // call function here

    const {
      roomName,
      error,
    }: { roomName?: string; error?: string } = (await addNewRoom(
      (newRoomInputRef.current as HTMLInputElement).value
    )) as {
      roomName: string;
      error: string;
    };

    if (error) return console.log("there is error", error);

    setNewRoomRoute(roomName);

    // console.log("here is the response", response);

    // reroute to the actual new room
  };

  return (
    <div className=" row-span-2 w-full bg-gray-200 py-32">
      <form
        onSubmit={handleNewRoomSubmit}
        className="flex flex-col w-8/12 px-4 mx-auto items-center h-32 justify-between"
      >
        <label htmlFor="" className="">
          Name your room:
        </label>
        <input
          type="text"
          className="rounded-lg px-4 py-2 text-center outline-none text-gray-600"
          required
          ref={newRoomInputRef}
        />
        <button className="bg-green-300 py-2 px-8 rounded-lg outline-none">
          Create room
        </button>
      </form>
      {/* {isUserJoined.errorMessage && (
            <p className="mt-8 px-4 text-center text-orange-900">
              {isUserJoined.errorMessage}
            </p>
          )} */}
      {newRoomRoute && <Redirect to={`/chat/room/${newRoomRoute}`} />}
    </div>
  );
};

export default NewRoom;
