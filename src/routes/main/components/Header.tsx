import React, { useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Nav } from "../../../styles/styles";
import Switch from "./Switch";

interface HeaderProps {
  theme: boolean;
  handle: Function;
}

const Header = ({ theme, handle }: HeaderProps) => {
  const [user] = useState(cookie.load("USER") ?? "0");
  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <Nav
        className={`uk-navbar uk-navbar-container uk-margin`}
        uk-navbar="mode:click"
      >
        <div className="uk-navbar-left">
          <Link className={`uk-navbar-item uk-logo`} to="/">
            Wlog
          </Link>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li className="uk-visible">
              <Switch check={theme} checked={handle} />
            </li>
            <li className={"uk-visible@s"}>
              {user === "0" ? (
                <Link to="/sign" className={""}>
                  Iniciar sesión
                </Link>
              ) : (
                <Link to={`/user/${user}`}>{user.toUpperCase()}</Link>
              )}
            </li>
            <li className={"uk-hidden@s"}>
              {user === "0" ? (
                <Link to="/sign" uk-icon="icon:user"></Link>
              ) : (
                <Link to={`/user/${user}`}>{user.toUpperCase()}</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="uk-navbar-center">
          <Link className={`uk-navbar-toggle`} to="/create">
            <span uk-icon="icon:plus-circle"></span>
          </Link>
        </div>
      </Nav>
    </div>
  );
};

export default Header;
