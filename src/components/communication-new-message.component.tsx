import React from "react";

const CommunicationNewMessage: React.FC = () => {
  return (
    <form className="mt-auto pl-2 pr-4 py-2 h-16 flex items-center justify-center">
      <label htmlFor="" hidden>
        New message
      </label>
      <textarea
        name=""
        id=""
        cols={30}
        rows={1}
        placeholder="Write a message"
        className="custom-scrollbar h-full w-full rounded-full p-3 text-gray-800 outline-none"
      />
    </form>
  );
};

export default CommunicationNewMessage;
