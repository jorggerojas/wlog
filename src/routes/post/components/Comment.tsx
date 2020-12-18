// @flow
import axios from "axios";
import React from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { parseDate, URL } from "../../../config";

interface CommentProps {
  comment: string;
  user: string;
  date: string;
  id: string;
  post: string;
}

const Comment = ({ comment, user, date, id, post }: CommentProps) => {
  const deleteComment = (id: string) => {
    swal({
      title: "Are you sure wanna delete this comment?",
      icon: "warning",
      buttons: {
        cancel: {
          visible: true,
          text: "Cancel",
        },
        ok: {
          visible: true,
          text: "Yes, delete",
        },
      },
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: "delete",
          url: `${URL}/users/${user}/posts/${post}/comments/${id}`,
          headers: {
            Authorization: `Bearer ${cookie.load("TOKEN")}`,
          },
        })
          .then(() => {
            swal({ icon: "success", title: "Comment deleted" }).then(() =>
              window.location.reload()
            );
          })
          .catch((error) => {
            if (error.response.status === 404)
              swal(
                "Sorry, we can't delete the comment because is missing or not exist"
              );
            else if (error.response.status === 401)
              swal(
                "Sorry, you can't delete the comment because you don't have permission to do it"
              );
            else
              swal("Sorry, we can't delete the comment right now, try later");
          });
      } else return;
    });
  };
  return (
    <article className="uk-comment uk-comment-primary uk-margin">
      <header
        className="uk-comment-header uk-grid-medium uk-flex-middle"
        uk-grid=""
      >
        <div className="uk-width-expand">
          <p
            style={{ fontSize: "1rem" }}
            className="uk-article-title uk-button uk-button-text"
          >
            <Link className="uk-link-reset" to={`/user/${user}`}>
              {user}
            </Link>
          </p>
          {cookie.load("USER") === user ||
          cookie.load("ROLE") === "ADMIN" ||
          cookie.load("ROLE") === "REDACTOR" ||
          cookie.load("ROLE") === "MODERADOR" ? (
            <div className="uk-align-right">
              <span
                style={{ cursor: "pointer" }}
                uk-icon="icon:close"
                onClick={() => deleteComment(id)}
              />
            </div>
          ) : null}
          <ul className="uk-comment-meta uk-subnav uk-text-left uk-margin-remove-top">
            <li className="uk-text-italic uk-padding-remove">
              {parseDate(date)}
            </li>
          </ul>
        </div>
      </header>
      <div className="uk-comment-body">
        <p className="uk-text-italic">{`${comment
          .toUpperCase()
          .substr(0, 1)}${comment
          .toLowerCase()
          .substr(1, comment.length - 1)}`}</p>
      </div>
    </article>
  );
};

export default Comment;
