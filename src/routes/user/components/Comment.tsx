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
      <div className="uk-card-header">
        <h4 className="uk-margin-remove">
          <Link to={`/post/${id}`} className="uk-link-heading">
            {post.substr(0, 1).toUpperCase() +
              post.substr(1, post.length - 1).toLowerCase()}
          </Link>
        </h4>
        <span className="uk-text-meta uk-text-italic">{date}</span>
      </div>
      <div className="uk-card-body">
        <p className="uk-text-secondary uk-text-italic">"{comment}"</p>
      </div>
    </div>
  );
};

export default Comment;
