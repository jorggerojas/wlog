// @flow
import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import swal from "sweetalert";
import { parseDate, URL } from "../../../config";
import {
  LinkUserComment,
  ParagraphShort,
  Date,
  CommentParagraph,
} from "../../../styles/text";
import { ArticleBox } from "../../../styles/containers";

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
    <ArticleBox className="uk-comment uk-comment-primary uk-margin">
      <header
        className="uk-comment-header uk-grid-medium uk-flex-middle"
        uk-grid=""
      >
        <div className="uk-width-expand">
          <ParagraphShort className="uk-article-title uk-button uk-button-text uk-text-bold">
            <LinkUserComment href={`/user/${user}`}>{user}</LinkUserComment>
          </ParagraphShort>
          {cookie.load("USER") === user ||
          cookie.load("ROLE") === "ADMIN" ||
          cookie.load("ROLE") === "REDACTOR" ||
          cookie.load("ROLE") === "MODERADOR" ? (
            <div className="uk-align-right">
              <span
                className="pointer"
                uk-icon="icon:close"
                onClick={() => deleteComment(id)}
              />
            </div>
          ) : null}
          <ul className="uk-comment-meta uk-subnav uk-text-left uk-margin-remove-top">
            <Date className="uk-padding-remove">{parseDate(date)}</Date>
          </ul>
        </div>
      </header>
      <div className="uk-comment-body">
        <CommentParagraph className="uk-text-italic">{`${comment
          .toUpperCase()
          .substr(0, 1)}${comment
          .toLowerCase()
          .substr(1, comment.length - 1)}`}</CommentParagraph>
      </div>
    </ArticleBox>
  );
};

export default Comment;
