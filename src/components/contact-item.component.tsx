import React from "react";

const ContactItem: React.FC = () => {
  return (
    <li className="flex justify-start py-4 border-b w-full">
      <div className="w-12">
        <img
          src="https://via.placeholder.com/100"
          alt=""
          className="w-full rounded-full"
        />
      </div>
      <div className="sm:flex flex-wrap ml-4 w-4/6 items-center hidden">
        <span className="">John</span>
        <span className="text-xs ml-auto text-gray-500">
          {" "}
          Yesterday{" "}
        </span>
        <p className="text-sm text-gray-600">
          John: Lorem Ipsum
        </p>
      </div>
    </li>
  );
};

export default ContactItem;
