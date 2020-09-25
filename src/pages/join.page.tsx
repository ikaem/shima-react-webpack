import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

import { httpJoinChat } from "../services/http.service";

interface JoinProps {
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

const Join: React.FC<JoinProps> = ({ setLoggedUser }) => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [isUserJoined, setIsUserJoined] = useState<{
    isJoined: boolean;
    errorMessage?: string;
  }>({ isJoined: false });

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUserJoined({ isJoined: false });

    if (!(loginInputRef.current as HTMLInputElement).value) return;

    const { value } = loginInputRef.current as HTMLInputElement;

    const { username, message } = await httpJoinChat(value);

    if (message)
      return setIsUserJoined({
        isJoined: false,
        errorMessage: message,
      });

    setLoggedUser(username);
    setIsUserJoined({
      isJoined: true,
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 py-32">
      <form
        onSubmit={handleJoin}
        className="flex flex-col w-8/12 px-4 mx-auto items-center h-32 justify-between"
      >
        <label htmlFor="" className="">
          Choose yours username:
        </label>
        <input
          type="text"
          className="rounded-lg px-4 py-2 text-center outline-none text-gray-600"
          required
          ref={loginInputRef}
        />
        <button className="bg-green-300 py-2 px-8 rounded-lg outline-none">
          Join
        </button>
      </form>
      {isUserJoined.errorMessage && (
        <p className="mt-8 px-4 text-center text-orange-900">
          {isUserJoined.errorMessage}
        </p>
      )}
      {isUserJoined.isJoined && <Redirect to="/chat/room/lobby" />}
    </div>
  );
};

export default Join;

/* 

    try {
      const { username, message } = await httpJoinChat(value);

      // if (message === "This username is taken")
      if (message)
        return setIsUserJoined({
          isJoined: false,
          errorMessage: message,
        });

      setLoggedUser(username);
      setIsUserJoined({
        isJoined: true,
        // errorMessage: message,
      });
    } catch (error) {
      console.log(error)
      setIsUserJoined({
        isJoined: false,
        errorMessage:
          "There was an issue joining the chat. Please refresh the page and try again.",
      });
    }

*/
