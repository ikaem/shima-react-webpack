import React, { RefObject } from "react";

interface CommunicationNewMessageProps {
  newMessageRef: RefObject<HTMLTextAreaElement>;
  handleNewMessage: (a: React.KeyboardEvent<HTMLFormElement>) => void;
}

const CommunicationNewMessage: React.FC<CommunicationNewMessageProps> = ({
  newMessageRef,
  handleNewMessage
}) => {
  return (
    <form
      onKeyPress={handleNewMessage}
      className="mt-auto pl-2 pr-4 py-2 h-16 flex items-center justify-center"
    >
      <label htmlFor="" hidden>
        New message
      </label>
      <textarea
        name=""
        id=""
        cols={30}
        rows={2}
        placeholder="Write a message"
        className="custom-scrollbar h-full w-full rounded-full p-3 text-gray-800 outline-none"
        ref={newMessageRef}
        style={{resize: "none"}}
      />
    </form>
  );
};

export default CommunicationNewMessage;
