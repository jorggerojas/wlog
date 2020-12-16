import React from "react";
import Badge from "./main/components/Badge";
import Header from "./main/components/Header";
import Main from "./main/Main";
import Users from "./main/components/Users";
import cookie from "react-cookies";
const App = () => {
  const role = cookie.load("ROLE");
  const data = [
    { title: "POSTS", isActive: true },
    role === "ADMIN" ? { title: "ALL USERS", isActive: false } : null,
  ];
  return (
    <div className="uk-animation-fade">
      <Header /*theme={"light"}*/ />
      <ul
        className="uk-subnav uk-subnav-pill uk-margin-small-left uk-margin-small-right uk-margin-remove-top"
        uk-switcher={""}
      >
        {data.map((pill: any) => (
          <Badge key={pill.title} title={pill.title} isActive={pill.isActive} />
        ))}
      </ul>
      <ul className="uk-switcher uk-margin">
        <li className="uk-active">
          <Main />
        </li>
        <li className="uk-margin-remove-top">
          <Users />
        </li>
      </ul>
    </div>
  );
};

export default App;
