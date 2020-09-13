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

  console.log("comm list:", communicationList)

  return (
    <div className="bg-white custom-scrollbar overflow-y-scroll px-4">
      <ul className="w-full">
        {/* {new Array(6).fill("").map((val, index) => (
          <ContactItem key={index} />
        ))} */}
        {communicationList.map((val, index) => {
          // const room = val.room;
          // const content = val.lastMessage.content;
          // const author = val.lastMessage.author

          console.log("rendering room:", val.room, "which is seen:", val.seen);

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
