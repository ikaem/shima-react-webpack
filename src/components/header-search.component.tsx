import React from "react";

const HeaderSearch: React.FC = () => {
  return (
    <form className="bg-gray-100 h-12 w-full px-4 flex flex-row-reverse items-center relative">
      <label htmlFor="" className="" hidden>
        Search
      </label>
      <input
        type="search"
        className="w-full rounded-tr-app-search rounded-br-app-search h-8 outline-none"
      />
      <button className="bg-white h-8 rounded-tl-app-search rounded-bl-app-search pl-2 relative">
        <svg
          className="h-6 w-6 relative text-gray-500"
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
  );
};

export default HeaderSearch;
