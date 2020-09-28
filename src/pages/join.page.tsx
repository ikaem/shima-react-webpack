import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import { httpJoinChat } from "../services/http.service";
import { LOGGED_USER_LOCAL } from "../app";
import { LoggedUserInterface } from "../apollo/apollo-client";

interface JoinProps {
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

const LOG_USER_MUTATION = gql`
  mutation LogUserMutation($email: String!) {
    logUser(email: $email) {
      _id
      name
      email
    }
  }
`;

const Join: React.FC<JoinProps> = ({ setLoggedUser }) => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [isUserJoined, setIsUserJoined] = useState<{
    isJoined: boolean;
    errorMessage?: string;
  }>({ isJoined: false });

  const [logUser, { client }] = useMutation<{
    logUser: LoggedUserInterface;
  }>(LOG_USER_MUTATION, {
    onCompleted: (data) => {
      console.log("here is returned data", data);
      setLoggedUser(data.logUser.name);
      setIsUserJoined({
        isJoined: true,
      });
    },
    onError: (error) => {
      console.log("here is the error", error.message);
      setIsUserJoined({
        isJoined: false,
        errorMessage: error.message,
      });
    },
    update: (_, { data }) => {
      client.writeQuery({
        query: LOGGED_USER_LOCAL,
        data: {
          loggedUser: data?.logUser,
        },
      });
    },
  });

  // testing
  const handleLogout = () => {
    client.resetStore();
  };

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    logUser({
      variables: {
        email: (loginInputRef.current as HTMLInputElement).value,
      },
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

      {/* <p>{loggedUserData.loggedUser.name}</p>
      <button disabled={!loggedUserData.loggedUser.name} onClick={handleLogout}>
        Log out here
      </button> */}
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
