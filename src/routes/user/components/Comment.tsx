// @flow
import React from "react";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: string;
  date: string;
  post: string;
  user: string;
}

const Comment = ({ comment, date, post, user }: CommentProps) => {
  return (
    <div className="uk-card-small uk-card-default uk-card-hover">
      <div className="uk-card-body">
        <span className="uk-text-meta uk-text-italic">{date}</span>
        <p className="uk-text-secondary uk-text-italic">"{comment}"</p>
      </div>
      <div className="uk-card-footer uk-text-right">
        <Link to={`/users/${user}/post/${post}`} className="uk-link-heading">
          Ver Post{" "}
        </Link>
      </div>
    </div>
  );
};

export default Comment;
