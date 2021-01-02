// @flow
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ContainerNoMatch, ImageNotFound } from "../styles/containers";
import { Code, Title3 } from "../styles/text";
import SVG from "../search.svg";

interface NoMatchProps {
  path?: string;
  theme: boolean;
  handle: Function;
}

const NoMatch = ({ path, theme }: NoMatchProps) => {
  let { pathname } = useLocation();
  return (
    <ContainerNoMatch className="uk-animation-fade uk-padding-large">
      <div>
        <ImageNotFound src={SVG} alt="not found" />
        <Title3 className="uk-margin-small">
          We're looking for <Code>{path ?? pathname}</Code> but we don't have
          any results
        </Title3>
      </div>
      <div className="uk-margin">
        <Link to="/">
          <Code>Return to the main page</Code>
        </Link>
      </div>
    </ContainerNoMatch>
  );
};

export default NoMatch;
