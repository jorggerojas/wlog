// @flow
import React from "react";
import swal from "sweetalert";
import { removeCookie, URL } from "../../../config";
import axios from "axios";
import cookie from "react-cookies";

interface DataProps {
  username: string;
  role: string;
  date: string;
  myAccount: boolean;
  admin: boolean;
  loading: boolean;
  setLoading: Function;
  blocked: string;
  setBlocked: Function;
}

const Data = ({
  username,
  role,
  date,
  myAccount,
  admin,
  loading,
  blocked,
  setBlocked,
  setLoading,
}: DataProps) => {
  const logOut = () => {
    swal({
      title: "Are you sure want to log out :(?",
      buttons: {
        cancel: {
          visible: true,
          text: "No",
        },
        ok: {
          visible: true,
          text: "Yes",
        },
      },
    }).then((willLogOut: boolean) => {
      if (willLogOut) {
        setLoading(true);
        setTimeout(() => {
          removeCookie("USER");
          removeCookie("ROLE");
          removeCookie("TOKEN");
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/";
          }, 100);
        }, 500);
      } else return;
    });
  };
  const deleteAccount = () => {
    swal({
      title: "Are you sure want to delete your account?",
      text:
        "All your data, posts, comments and related information will be destroyed forever.",
      icon: "warning",
      buttons: {
        cancel: {
          visible: true,
          text: "No",
        },
        ok: {
          visible: true,
          text: "Yes",
        },
      },
      dangerMode: true,
    }).then((willDelete: boolean) => {
      if (willDelete) {
        setLoading(!loading);
        setTimeout(() => {
          deleteForeverAndEver();
        }, 500);
      } else return;
    });
  };
  const deleteForeverAndEver = () => {
    axios({
      method: "delete",
      url: `${URL}/users/${username}`,
      headers: {
        Authorization: `Bearer ${cookie.load("TOKEN")}`,
      },
    })
      .then(() => {
        removeCookie("USER");
        removeCookie("ROLE");
        removeCookie("TOKEN");
        setTimeout(() => {
          swal("Poof! Your account and all the data have been deleted!", {
            icon: "success",
          }).then(() => {
            setLoading(false);
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          });
        }, 500);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          swal("You can't make this move your role", {
            icon: "error",
          });
        } else {
          swal(
            "We can't delete the account because it's missing or not exist",
            {
              icon: "error",
            }
          );
        }
        setLoading(false);
      });
  };
  const enable = (isBlocked: string) => {
    setLoading(true);
    axios({
      method: "put",
      url: `${URL}/users/${username}`,
      headers: {
        Authorization: `Bearer ${cookie.load("TOKEN")}`,
      },
      data: {
        isBlocked: `${isBlocked === "1" ? "0" : "1"}`,
      },
    })
      .then(() => {
        setBlocked(isBlocked === "1" ? "0" : "1");
        setTimeout(() => {
          setLoading(false);
          isBlocked === "1"
            ? swal({
                title: "Account enabled",
              })
            : swal({
                title: "Account disabled",
              });
        }, 500);
      })
      .catch((error: any) => {
        if (error.response.status === 404) {
          swal(
            "We can't change the account because it's missing or not exist",
            {
              icon: "error",
            }
          );
        } else {
          swal("You can't make this move your role", {
            icon: "error",
          });
        }
      });
  };
  return (
    <div className={`uk-text-center`}>
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
        {blocked === "1" ? (
          <p className="uk-margin-remove-top uk-text-secondary uk-text-bolder">
            BLOCKED
          </p>
        ) : null}
        <p className="uk-text-bold">{role.toUpperCase()}</p>
        <div className="uk-grid uk-flex-around" uk-grid="">
          {myAccount ? (
            <div className="uk-width-1-1 uk-margin-small">
              <button
                className="uk-button-text uk-button uk-text-danger uk-margin"
                onClick={logOut}
              >
                Log out
              </button>
            </div>
          ) : null}
          {admin && !myAccount ? (
            <div>
              <button
                className="uk-button uk-button-text uk-text-danger uk-margin"
                onClick={() => enable(blocked)}
              >
                {blocked === "1" ? "Enable account" : "Disable account"}
              </button>
            </div>
          ) : null}
          {admin || myAccount ? (
            <div>
              <button
                className="uk-button uk-button-danger uk-margin"
                onClick={deleteAccount}
              >
                Delete account
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Data;
