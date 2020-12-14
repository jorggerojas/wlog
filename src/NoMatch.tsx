import React from "react";
import { Link, useLocation } from "react-router-dom";
const NoMatch = () => {
  let { pathname } = useLocation();
  return (
    <div className="uk-height-large uk-animation-fade uk-text-center uk-margin-large-top">
      <div className="">
        <h3>
          No match for <code>{pathname}</code>
        </h3>
      </div>
      <br />
      <div className="">
        <Link to="/">
          <code>Return to the main page</code>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
