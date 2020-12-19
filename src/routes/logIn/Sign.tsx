import React, { useState } from "react";
import { Link } from "react-router-dom";
import t from "typy";
import { removeCookie } from "../../config";
import Loading from "../loading/Loading";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Sign = () => {
  useState(() => {
    removeCookie("USER");
    removeCookie("TOKEN");
    removeCookie("ROLE");
  });
  const [view, setView] = useState(false);
  const [load, setLoad] = useState(false);
  const changeView = () => setView(!view);
  return (
    <div
      className="uk-grid uk-animation-fade"
      style={{
        background: "#fd7777 no-repeat",
        height: "auto",
      }}
      uk-grid=""
    >
      <Loading load={load} />
      <div
        style={{
          WebkitFilter: t(load).isTrue ? "blur(15px)" : "blur(0)",
        }}
        className="uk-width-2-5@s uk-visible@s uk-text-center uk-text-middle uk-flex uk-flex-middle uk-flex-center"
      >
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
        style={{
          background: "white",
          WebkitFilter: load ? "blur(15px)" : "blur(0)",
        }}
      >
        {t(view).isFalse ? (
          <SignIn handle={changeView} loading={setLoad} />
        ) : (
          <SignUp handle={changeView} loading={setLoad} />
        )}
      </div>
    </div>
  );
};

export default Sign;
