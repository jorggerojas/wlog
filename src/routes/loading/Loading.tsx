// @flow
import React from "react";
import t from "typy";
import svg from "../../load.svg";
import { Image, LoadingContainer, Title3 } from "../../styles/styles";

interface LoadingProps {
  load: boolean;
}

const Loading = ({ load }: LoadingProps) => {
  return (
    <LoadingContainer
      className={`uk-width-1-1 ${
        t(load).isTrue
          ? "uk-visible uk-animation-fade"
          : "uk-hidden uk-animation-fade"
      } uk-margin-large-top uk-position-absolute uk-position-z-index uk-position-large
        uk-position-center uk-overlay uk-overlay-default uk-animation-fade`}
    >
      <Title3 className="uk-text-center uk-margin-large-top uk-text-bold">
        Loading, please wait...
      </Title3>
      <div className="uk-text-center uk-margin">
        <Image src={svg} alt="Loading" />
      </div>
    </LoadingContainer>
  );
};

export default Loading;
