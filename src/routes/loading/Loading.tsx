import React from "react";
import svg from "../../load.svg";
import "../../styles/index.css";

interface LoadingProps {
  load: boolean;
}

const Loading = ({ load }: LoadingProps) => {
  return (
    <div
      className={`uk-width-1-1 ${
        load ? "uk-visible uk-animation-fade" : "uk-hidden uk-animation-fade"
      } uk-position-absolute uk-position-z-index uk-position-large uk-position-center uk-overlay uk-overlay-default uk-animation-fade`}
      style={{ background: "none", height: "70%" }}
    >
      <h3 className="uk-text-center uk-margin-large-bottom uk-text-bold">
        Loading, please wait...
      </h3>
      <div className="uk-text-center uk-margin">
        <img src={svg} alt="" style={{ position: "relative", width: "50%" }} />
      </div>
    </div>
  );
};

export default Loading;
