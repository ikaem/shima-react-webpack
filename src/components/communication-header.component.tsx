import React from "react";

const CommunicationHeader: React.FC = () => {
  return (
    <header className="communication-container_header px-4 py-2 border-l min-h-comm-header-height flex items-center">
      <a
        href="#"
        className="header_avatar-container w-10 h-10 rounded-full overflow-hidden"
      >
        <img src="https://via.placeholder.com/100" alt="" className="w-full" />
      </a>

      <div className="header_communication-info flex flex-col justify-center ml-4">
        <span className="communication-info_name">John</span>
        <span className="communication-info_context text-xs text-gray-700">
          Last seen today at 13:33
        </span>
      </div>

      <form className="ml-auto main-header_search-communication-form">
        <label htmlFor="" className="search-communication-form_label" hidden>
          Search
        </label>
        <input
          type="search"
          className="search-communication-form_input hidden"
        />
        <button className="search-communication-form_submit-btn">
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
