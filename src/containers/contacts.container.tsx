import React from "react";

import ContactItem from "../components/contact-item.component";

const Contacts: React.FC = () => {
  return (
    <div className="bg-white custom-scrollbar overflow-y-scroll px-4">
      <ul className="w-full">
        {new Array(6).fill("").map((val, index) => (
          <ContactItem key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
