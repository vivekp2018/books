import React from "react";
import Navbar from "./Navbar";
import SubNavbar from "./SubNavbar";
import User from "../user/User";

const Header = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <header>
          <Navbar me={me} />
          {me && (
            <div className="container">
              <SubNavbar />
            </div>
          )}
        </header>
      )}
    </User>
  );
};

export default Header;
