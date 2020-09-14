import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children}) => {
  return (
    <>
      <div className="green-ribbon fixed bg-teal-500 h-32 w-full top-0" />
      {children}
    </>
  );
};

export default Layout;
