// @flow
import React from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: string;
  user: string;
}

const Comment = ({ comment, user }: CommentProps) => {
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
          {cookie.load("USER") === user ? (
            <div className="uk-align-right">
              <span style={{ cursor: "pointer" }} uk-icon="icon:close" />
            </div>
          ) : null}
          <ul className="uk-comment-meta uk-subnav uk-text-left uk-margin-remove-top">
            <li className="uk-text-italic uk-padding-remove">2020-12-12</li>
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
