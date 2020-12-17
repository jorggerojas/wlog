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
}

const Data = ({
  username,
  role,
  date,
  myAccount,
  admin,
  loading,
  setLoading,
}: DataProps) => {
  const logOut = () => {
    swal({
      title: "Are you sure want to log out :(?",
      buttons: {
        ok: {
          visible: true,
          text: "Yes",
        },
        cancel: {
          visible: true,
          text: "No",
        },
      },
    }).then((willLogOut: boolean) => {
      if (willLogOut) {
        setLoading(!loading);
        setTimeout(() => {
          removeCookie("USER");
          removeCookie("ROLE");
          removeCookie("TOKEN");
          setTimeout(() => {
            setLoading(!loading);
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
      .then(({ status }: any) => {
        if (status === 204) {
          removeCookie("USER");
          removeCookie("ROLE");
          removeCookie("TOKEN");
          swal("Poof! Your account and all the data have been deleted!", {
            icon: "success",
          }).then(() => {
            setLoading(false);
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          });
        }
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
              <button className="uk-button uk-button-text uk-text-danger uk-margin">
                Disable account
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
