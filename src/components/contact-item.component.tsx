import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams, useLocation, useRouteMatch } from "react-router-dom";

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
  // console.log("params here", pathname.split("/")[2])

  // console.log("seen?", seen)

  // const stuff = useMemo(() => ({
  //   thing: "this loads, yes..."
  // }), [room, author, content])

  // const [isUnread, setIsUnread] = useState(true);

  // console.log("this contact item loaded:", room);
  // console.log("this stuff loaded", stuff);

  useEffect(() => {
    const param = pathname.split("/")[2];
    param === room && setCommObjectRead(room);
    // param === room && console.log(room, "is seen:", seen);
    // console.log("pathname changed to", pathname);
  }, [pathname, content]);

  // setCommObjectRead(room)

  return (
    <li className="flex justify-start py-4 border-b w-full">
      <div className="w-12">
        <img
          src="https://via.placeholder.com/100"
          alt=""
          className="w-full rounded-full"
        />
      </div>
      <div className="sm:flex justify-start flex-wrap ml-4 w-4/6 items-center hidden">
        <Link to={`/room/${room}`}>
          <span className="">{room}</span>
        </Link>

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
  );
};

// const areEqual = (prevProps: unknown, nextProps: unknown) => {
//   if(prevProps.room === nextProps.room) return true
// }

// export default memo(ContactItem);
export default ContactItem;
