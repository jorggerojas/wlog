import React from "react";
import { Link, useLocation } from "react-router-dom";
const NoMatch = () => {
  let { pathname } = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{pathname}</code>
      </h3>
      <Link to="/">
        <code>Return to the main page</code>
      </Link>
    </div>
  );
};

export default NoMatch;
