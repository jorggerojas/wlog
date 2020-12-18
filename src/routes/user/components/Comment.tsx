// @flow
import React from "react";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: string;
  date: string;
  post: string;
  id: string;
}

const Comment = ({ comment, date, post, id }: CommentProps) => {
  return (
    <div className="uk-card-small uk-card-default uk-card-hover">
      <div className="uk-card-body">
        <span className="uk-text-meta uk-text-italic">{date}</span>
        <p className="uk-text-secondary uk-text-italic">"{comment}"</p>
      </div>
      <div className="uk-card-footer uk-text-right">
        <Link to={`/post/${id}`} className="uk-link-heading">
          Ver Post{" "}
        </Link>
      </div>
    </div>
  );
};

export default Comment;
