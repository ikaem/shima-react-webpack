import React from "react";

interface CommunicationHeaderProps {
  roomName: string;
}

const CommunicationHeader: React.FC<CommunicationHeaderProps> = ({
  roomName,
}) => {
  return (
    <header className="px-4 py-2 border-l min-h-comm-header-height flex items-center">
      <a href="#" className="w-10 h-10 rounded-full overflow-hidden">
        <img src="https://via.placeholder.com/100" alt="" className="w-full" />
      </a>

      <div className="flex flex-col justify-center ml-4">
        <span className="">{roomName}</span>
        <span className="text-xs text-gray-700">Last seen today at 13:33</span>
      </div>

      <form className="ml-auto">
        <label htmlFor="" className="" hidden>
          Search
        </label>
        <input type="search" className="hidden" />
        <button className="">
          <svg
            className="w-6 h-6 relative text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
    </header>
  );
};

export default CommunicationHeader;
