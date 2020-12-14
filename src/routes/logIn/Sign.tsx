import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Sign = () => {
  const [view, setView] = useState(false);
  const changeView = () => setView(!view);
  return (
    <div
      style={{
        background: "#fd7777 no-repeat",
        height: "auto",
      }}
      className="uk-grid uk-animation-fade"
      uk-grid=""
    >
      <div className="uk-width-2-5@s uk-visible@s uk-text-center uk-text-middle uk-flex uk-flex-middle uk-flex-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            className="uk-text-center uk-text-middle uk-text-bold"
            style={{
              color: "white",
              letterSpacing: 8,
              textShadow: "-2px -2px #4e2424",
            }}
          >
            WLOG
          </h1>
        </Link>
      </div>
      <div
        className="uk-width-3-5@s uk-flex-middle uk-flex uk-flex-center uk-margin uk-padding"
        style={{ background: "white" }}
      >
        {!view ? (
          <SignIn view={view} handle={changeView} />
        ) : (
          <SignUp view={view} handle={changeView} />
        )}
      </div>
    </div>
  );
};

export default Sign;
