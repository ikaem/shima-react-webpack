import React from "react";

const ContactItem: React.FC = () => {
  return (
    <li className="contact-list_contact-item flex justify-start py-4 border-b w-full">
      <div className="contact-item_avatar-container w-12">
        <img
          src="https://via.placeholder.com/100"
          alt=""
          className="w-full rounded-full"
        />
      </div>
      <div className="contact-item_contact-info sm:flex flex-wrap ml-4 w-4/6 items-center hidden">
        <span className="contact-info_title">John</span>
        <span className="contact-info_contact-date text-xs ml-auto text-gray-500">
          {" "}
          Yesterday{" "}
        </span>
        <p className="contact-info_excerpt text-sm text-gray-600">
          John: Lorem Ipsum
        </p>
      </div>
    </li>
  );
};

export default ContactItem;
