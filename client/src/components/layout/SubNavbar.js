import React from "react";
import { Link } from "@reach/router";
const SubNavbar = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/books">
              Books
            </Link>
            <Link className="nav-item nav-link" to="/publishers">
              Publishers
            </Link>
            <Link className="nav-item nav-link" to="/authors">
              Authors
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SubNavbar;
