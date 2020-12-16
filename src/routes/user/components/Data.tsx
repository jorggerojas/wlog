import React from "react";

interface DataProps {
  username: string;
  role: string;
  date: string;
  myAccount: boolean;
  admin: boolean;
}

const Data = ({ username, role, date, myAccount, admin }: DataProps) => {
  return (
    <div className="uk-text-center">
      <h2
        className="uk-text-bolder uk-text-truncate"
        title={username.toUpperCase()}
        style={{
          fontSize: username.length < 11 ? "2.5rem" : `1.9rem`,
        }}
      >
        {username.toUpperCase()}
      </h2>
      <div className="uk-margin">
        <p className="uk-margin-remove-top uk-text-meta uk-text-italic">
          Member since: {date}
        </p>
        <p className="uk-text-bold">{role.toUpperCase()}</p>
        <div className="uk-grid uk-flex-around" uk-grid="">
          {admin && !myAccount ? (
            <div>
              <button className="uk-button uk-button-text uk-text-danger uk-margin">
                Disable account
              </button>
            </div>
          ) : null}
          {admin || myAccount ? (
            <div>
              <button className="uk-button uk-button-danger uk-margin">
                Delete account
              </button>
            </div>
          ) : null}
          {myAccount ? (
            <div>
              <button className=" uk-button uk-button-danger uk-margin">
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Data;
