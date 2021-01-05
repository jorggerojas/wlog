// @flow
import React from "react";
import t from "typy";
import svg from "../../load.svg";
import { Image, TitleLoading } from "../../styles/text";
import { LoadingContainer } from "../../styles/containers";

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
      } uk-margin-large-top uk-position-absolute uk-position-z-index 
        uk-position-center uk-overlay  uk-animation-fade`}
    >
      <TitleLoading className="uk-text-center uk-margin-large-top uk-text-bold">
        Loading, please wait...
      </TitleLoading>
      <div className="uk-text-center uk-margin">
        <Image className="load" src={svg} alt="Loading" />
      </div>
    </LoadingContainer>
  );
};

export default Loading;
