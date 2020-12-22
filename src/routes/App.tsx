// @flow
import React from "react";
import t from "typy";
import cookie from "react-cookies";
import Badge from "./main/components/Badge";
import Header from "./main/components/Header";
import Main from "./main/Main";
import Users from "./main/components/Users";
import { ContainerList } from "../styles/text";
import { Container } from "../styles/containers";

interface AppProps {
  theme: boolean;
  handle: Function;
}

const App = ({ theme, handle }: AppProps) => {
  const role = cookie.load("ROLE");
  const data =
    role === "ADMIN"
      ? [
          { title: "POSTS", isActive: true },
          { title: "ALL USERS", isActive: false },
        ]
      : [{ title: "POSTS", isActive: true }];
  return (
    <Container className="uk-animation-fade">
      <Header theme={theme} handle={handle} />
      <ul
        className="uk-margin-top uk-subnav uk-subnav-pill uk-margin-small-left uk-margin-small-right"
        uk-switcher={""}
      >
        {!t(data).isEmptyArray &&
          data.map((pill: any) => (
            <Badge
              key={pill.title}
              title={pill.title}
              isActive={pill.isActive}
            />
          ))}
      </ul>
      <ContainerList className="uk-switcher uk-margin">
        <li className="uk-active">
          <Main />
        </li>
        <li className="uk-margin-remove-top">
          <Users theme={theme} />
        </li>
      </ContainerList>
    </Container>
  );
};

export default App;
