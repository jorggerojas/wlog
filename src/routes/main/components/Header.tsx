import React, { useState } from "react";
import { /*globalDark,*/ globalLight } from "../../../styles/global";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Header = () => {
  const [user] = useState(cookie.load("USER", false) ?? "0");
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
              {user === "0" ? (
                <Link to="/sign" className={whiteText}>
                  Iniciar sesión
                </Link>
              ) : (
                <Link to={`user/${user}`} className={whiteText}>
                  {user.toUpperCase()}
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="uk-navbar-center">
          <Link className={`uk-navbar-toggle ${whiteText}`} to="#">
            <span uk-icon="icon:plus-circle"></span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
