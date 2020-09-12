import React from "react";

import HeaderNavigation from "../components/header-navigation.component";
import HeaderSearch from "../components/header-search.component";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col">
      <HeaderNavigation />
      <HeaderSearch />
    </header>
  );
};

export default Header;
