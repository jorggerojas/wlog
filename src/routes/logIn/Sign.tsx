import React, { useState } from "react";
import { Link } from "react-router-dom";
import t from "typy";
import { removeCookie } from "../../config";
import Loading from "../loading/Loading";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Title1 } from "../../styles/text";
import { ContainerSign, SignContainer } from "../../styles/containers";

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
    <SignContainer className="uk-grid uk-animation-fade" uk-grid="">
      <Loading load={load} />
      <div
        className={`${
          t(load).isTrue ? "blur" : ""
        } uk-width-2-5@s uk-visible@s uk-text-center uk-text-middle uk-flex uk-flex-middle uk-flex-center`}
      >
        <Link to="/" className="uk-link-reset">
          <Title1 className="uk-text-center uk-text-middle uk-text-bold">
            WLOG
          </Title1>
        </Link>
      </div>
      <ContainerSign
        className={`${
          t(load).isTrue ? "blur" : ""
        } uk-section-default uk-width-3-5@s uk-flex-middle uk-flex uk-flex-center uk-margin uk-padding`}
      >
        {t(view).isFalse ? (
          <SignIn handle={changeView} loading={setLoad} />
        ) : (
          <SignUp handle={changeView} loading={setLoad} />
        )}
      </ContainerSign>
    </SignContainer>
  );
};

export default Sign;
