import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Sign = () => {
  return (
    <div
      style={{
        background: "#fd7777 no-repeat",
      }}
    >
      <div
        style={{
          background: "no-repeat",
          backgroundSize: "cover",
          mixBlendMode: "lighten",
          opacity: 0.5,
          filter: "blur(1.4px)",
        }}
        className=" uk-cover-container uk-width-5-5@s uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
        data-src="https://www.wallpapertip.com/wmimgs/219-2191818_os-x-mavericks-activity-monitor-change-the-login.jpg"
        uk-img=""
        uk-height-viewport=""
      ></div>
      <div
        // style={{ backgroundColor: "#fd7777" }}
        className="uk-position-large uk-position-cover uk-overlay uk-position-z-index uk-flex uk-flex-center uk-flex-middle"
      >
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default Sign;
