import React from "react";

const CommunicationMessage: React.FC = () => {
  return (
    <li className="message-list_message-item self-start p-2 rounded-lg rounded-tl-none bg-white shadow relative mb-3 flex flex-col">
      <p className="message-item_message-content text-sm text-gray-900">
        Hello, this is my message
      </p>
      <div className="message-item_message-context text-xs mt-2 self-end text-gray-600 flex place-items-center">
        <span className="message-context_time">13:33</span>
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
