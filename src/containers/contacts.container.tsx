import React, { useContext } from "react";

import ContactItem from "../components/contact-item.component";

import { MessagesContext } from "../contexts/messages.context";

const Contacts: React.FC = () => {
  const { communicationList } = useContext(MessagesContext) as {
    communicationList: {
      room: string;
      seen: boolean;
      lastMessage: {
        author: string;
        content: string;
      };
    }[];
  };

  const { setCommObjectRead } = useContext(MessagesContext) as {
    setCommObjectRead: (a: string) => void;
  };


  return (
    <div className="bg-white custom-scrollbar overflow-y-scroll px-4">
      <ul className="w-full">
        {communicationList.map((val, index) => {

          return (
            <ContactItem
              setCommObjectRead={setCommObjectRead}
              room={val.room}
              seen={val.seen}
              content={val.lastMessage.content}
              author={val.lastMessage.author}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
