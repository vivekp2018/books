import React from "react";
import { Link } from "@reach/router";
import Signout from "../user/Signout";

const Navbar = ({ me }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Book Review
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {!me && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}

            <li className="nav-item">
              <span className="nav-link">Contact</span>
            </li>
            {me && <Signout />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
