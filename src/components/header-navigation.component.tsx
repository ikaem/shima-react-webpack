import React from "react";

const HeaderNavigation: React.FC = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:h-16 items-center px-4 pt-3 sm:pt-0 justify-between">
      <a
        href="#"
        className="w-10 h-10 rounded-full overflow-hidden"
      >
        <img src="https://via.placeholder.com/100" alt="" className="w-full" />
      </a>
      <a href="#" className="my-4 text-gray-600">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </a>
    </nav>
  );
};

export default HeaderNavigation;
