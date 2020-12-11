import React from "react";
import { /*globalDark,*/ globalLight } from "../../../styles/global";
import { Link, BrowserRouter as Router } from "react-router-dom";

const Header = ({ ...props }) => {
  const { navColor, padd, whiteText } = globalLight();
  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav
        className={`${navColor} uk-navbar uk-navbar-container uk-margin`}
        uk-navbar="mode:click"
      >
        <div className="uk-navbar-left">
          <Link className={`${whiteText} uk-navbar-item uk-logo`} to="/">
            Wlog
          </Link>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li className={padd}>
              <Router>
                <Link to="" className={whiteText}>
                  Iniciar sesión
                </Link>
              </Router>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-center">
          <Router>
            <Link className={`uk-navbar-toggle ${whiteText}`} to="">
              <span uk-icon="icon:plus-circle"></span>
            </Link>
          </Router>
        </div>
      </nav>
    </div>
  );
};

export default Header;
