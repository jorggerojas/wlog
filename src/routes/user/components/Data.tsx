import React from "react";

interface DataProps {
  username: string;
}

const fakeData = {
  date: "2020-12-12",
  role: "ADMIN",
};
const { date, role } = fakeData;

const Data = ({ username }: DataProps) => {
  return (
    <div className="uk-text-center">
      <h2
        className="uk-text-bolder uk-text-truncate"
        title={username.toUpperCase()}
        style={{
          fontSize: username.length < 10 ? "3vw" : `2rem`,
        }}
      >
        {username.toUpperCase()}
      </h2>
      <p className="uk-text-bold uk-margin-remove">{role.toUpperCase()}</p>
      <p className="uk-text-meta uk-text-italic">Member since: {date}</p>
    </div>
  );
};

export default Data;
