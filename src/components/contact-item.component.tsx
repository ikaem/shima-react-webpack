import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface ContactItemProps {
  setCommObjectRead: (a: string) => void;
  room: string;
  seen: boolean;
  author: string;
  content: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  room,
  seen,
  author,
  content,
  setCommObjectRead,
}) => {
  const { pathname } = useLocation<{ pathname: string }>();

  useEffect(() => {
    const param = pathname.split("/")[3];
    param === room && setCommObjectRead(room);
  }, [pathname, content]);

  return (
    <Link to={`/chat/room/${room}`}>
      <li className="flex justify-start py-4 border-b w-full">
        <div className="w-12">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-full rounded-full"
          />
        </div>
        <div className="sm:flex justify-start flex-wrap ml-4 w-4/6 items-center hidden">
          <span className="">{room}</span>

          <span className="text-xs ml-auto text-gray-500"> Yesterday </span>
          <p
            className={`text-sm w-full ${
              !seen ? "text-red-600 " : "text-gray-600"
            }`}
          >
            {author}: {content}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default ContactItem;
