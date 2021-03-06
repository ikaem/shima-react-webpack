import React from "react";

export interface CommunicationMessageProps {
  name: string;
  content: string;
  loggedUser: string;
}

const CommunicationMessage: React.FC<CommunicationMessageProps> = ({
  name,
  content,
  loggedUser,
}) => {
  return (
    <li
      className={`my-message ${
        name !== loggedUser && name !== "admin" && "other-user-message"
      } ${name === "admin" && "admin-user-message"}`}
    >
      <span className={`text-gray-600 mb-2 font-semibold ${loggedUser === name && "text-right"}`}>{name}</span>
      <p className="text-sm text-gray-900">{content}</p>
      <div className="text-xs mt-2 self-end text-gray-600 flex place-items-center">
        <span className="">{"22/08/2020"}</span>
        <svg
          className="w-5 h-5 inline text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
    </li>
  );
};

export default CommunicationMessage;
