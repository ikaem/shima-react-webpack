import React, { useContext } from "react";

import ContactItem from "../components/contact-item.component";

import { MessagesContext } from "../contexts/messages.context";

const Contacts: React.FC = () => {
  const { communicationList } = useContext(MessagesContext) as {
    communicationList: {
      room: string;
      lastMessage: {
        author: string;
        content: string;
      };
    }[];
  };

  return (
    <div className="bg-white custom-scrollbar overflow-y-scroll px-4">
      <ul className="w-full">
        {/* {new Array(6).fill("").map((val, index) => (
          <ContactItem key={index} />
        ))} */}
        {communicationList.map((val, index) => (
          <ContactItem room={val.room} lastMessage={val.lastMessage} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
