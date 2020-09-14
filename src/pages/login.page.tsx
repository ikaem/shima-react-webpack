import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

const Login: React.FC = () => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [isUserJoined, setIsUserJoined] = useState<{
    status: boolean;
    errorMessage?: string;
  }>({ status: false });

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(loginInputRef.current as HTMLInputElement).value) return;

    const { value } = loginInputRef.current as HTMLInputElement;

    // manual fetch call

    try {
      const joinPromise = await fetch("http://localhost:5000" + "/join", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: value.trim() }),
      }).then((joinResponse) => joinResponse.json());

      const { username, message } = (await joinPromise) as {
        username: string;
        message: string;
      };

      console.log("this username", username, message);

      if (message === "This username is taken")
        return setIsUserJoined({
          status: false,
          errorMessage: message,
        });

      setIsUserJoined({
        status: true,
        errorMessage: message,
      });
    } catch (error) {
      console.log("this is error:", error);
      setIsUserJoined({
        status: false,
        errorMessage:
          "There was an issue joining the chat. Please refresh the page and try again.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full relative bg-gray-200 xl:my-5 py-32">
      <form
        onSubmit={handleJoin}
        className="flex flex-col w-8/12 px-4 mx-auto items-center h-32 justify-between"
      >
        <label htmlFor="" className="">
          Choose your username:
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
      {isUserJoined.status && <Redirect to="/chat" />}
    </div>
  );
};

export default Login;
