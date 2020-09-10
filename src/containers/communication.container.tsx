import React from "react";

import CommunicationHeader from "../components/communication-header.component";
import CommunicationMessage from "../components/communication-message.component";
import CommunicationNewMessage from "../components/communication-new-message.component";

const Communication: React.FC = () => {
  return (
    <main>
      <CommunicationHeader />

      <div>
        <ul>
          {new Array(6).fill("").map((val, index) => (
            <CommunicationMessage key={index} />
          ))}
        </ul>
      </div>

      <CommunicationNewMessage />
    </main>
  );
};

export default Communication;
