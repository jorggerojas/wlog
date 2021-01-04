// @flow
import React from "react";
import { Link } from "react-router-dom";
import { CardBody } from "../../../styles/containers";
import { CommentParagraph } from "../../../styles/text";

interface CommentProps {
  comment: string;
  date: string;
  post: string;
  user: string;
}

const Comment = ({ comment, date, post, user }: CommentProps) => {
  return (
    <CardBody className="uk-card-small uk-card-default uk-card-hover">
      <div className="uk-card-body">
        <span className="uk-text-meta uk-text-italic">{date}</span>
        <CommentParagraph className="uk-text-italic">
          "{comment}"
        </CommentParagraph>
      </div>
      <div className="uk-card-footer uk-text-right">
        <Link to={`/user/${user}/post/${post}`} className="uk-link-heading">
          Ver Post{" "}
        </Link>
      </div>
    </CardBody>
  );
};

export default Comment;
