import React, { useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Nav } from "../../../styles/containers";
import Switch from "./Switch";
import { HeaderLink } from "../../../styles/text";

interface HeaderProps {
  theme: boolean;
  handle: Function;
  username?: string;
}

const Header = ({ theme, handle, username }: HeaderProps) => {
  let userCookie = username ?? "0";
  const [user] = useState(cookie.load("USER") ?? userCookie);
  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <Nav
        className={`uk-navbar uk-navbar-container uk-margin`}
        uk-navbar="mode:click"
      >
        <div className="uk-navbar-left">
          <Link className={`uk-navbar-item uk-logo`} to="/">
            <HeaderLink>Wlog</HeaderLink>
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
                  <HeaderLink>Log in</HeaderLink>
                </Link>
              ) : (
                <Link to={`/user/${user}`}>
                  <HeaderLink>{user.toUpperCase()}</HeaderLink>
                </Link>
              )}
            </li>
            <li className={"uk-hidden@s"}>
              {user === "0" ? (
                <HeaderLink>
                  {" "}
                  <Link to="/sign" uk-icon="icon:user; ratio:1.3"></Link>
                </HeaderLink>
              ) : (
                <Link to={`/user/${user}`}>
                  <HeaderLink>{user.toUpperCase()}</HeaderLink>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="uk-navbar-center">
          <Link className={`uk-navbar-toggle`} to="/create">
            <span className="white" uk-icon="icon:plus-circle"></span>
          </Link>
        </div>
      </Nav>
    </div>
  );
};

export default Header;
