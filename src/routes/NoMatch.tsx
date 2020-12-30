// @flow
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ContainerNoMatch } from "../styles/containers";
import { Code, Title3 } from "../styles/text";

interface NoMatchProps {
  path?: string;
  theme: boolean;
  handle: Function;
}

const NoMatch = ({ path, theme }: NoMatchProps) => {
  let { pathname } = useLocation();
  return (
    <ContainerNoMatch className="uk-animation-fade uk-padding-large">
      <Title3>
        No match for <Code>{path ?? pathname}</Code>
      </Title3>
      <br />
      <Link to="/">
        <Code>Return to the main page</Code>
      </Link>
    </ContainerNoMatch>
  );
};

export default NoMatch;
