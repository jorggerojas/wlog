// @flow
import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import t from "typy";
import axios from "axios";
import cookie from "react-cookies";
import swal from "sweetalert";
import { URL } from "../../../config";
import { Form } from "../../../styles/styles";

interface CommentBoxProps {
  post: string;
  setComments: Function;
  getComments: Function;
}

const CommentBox = ({ post, setComments, getComments }: CommentBoxProps) => {
  const { USER, ROLE } = cookie.loadAll();
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: object({
      comment: string().required(
        "Comment is required if you want to say something"
      ),
    }),
    onSubmit: (values) => {
      if (t(ROLE).isNullOrUndefined) {
        swal({
          title: "Wait!",
          text:
            "You need to have an account to comment in this or another post",
          buttons: {
            cancel: {
              visible: true,
              text: "Cancel",
            },
            ok: {
              visible: true,
              text: "Let me in!",
            },
          },
        }).then((willSign) => {
          if (willSign) {
            window.location.href = "/sign";
          } else return;
        });
      } else {
        setDisabled(true);
        axios({
          method: "POST",
          url: `${URL}/users/${USER}/posts/${post}/comments`,
          headers: {
            Authorization: `Bearer ${cookie.load("TOKEN")}`,
          },
          data: {
            user: USER,
            post: post,
            content: values.comment,
          },
        })
          .then(() => {
            formik.values.comment = "";
            getComments().then(({ data }: any) => {
              setComments(data.content);
              setTimeout(() => {
                setDisabled(false);
              }, 500);
            });
          })
          .catch(() => {
            swal("You can't comment this post right now, try later");
          });
      }
    },
  });
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="uk-comment uk-comment-primary"
    >
      <header className="uk-comment-header uk-grid uk-flex-middle" uk-grid={""}>
        <div className="uk-width-1-2@s uk-grid" uk-grid="">
          <div className="uk-width-1-1@s">
            <h4 className="uk-comment-title ">Write a comment for this post</h4>
          </div>
          <div className="uk-width-1-1@s uk-margin-bottom">
            <p className=" uk-text-meta uk-margin">
              Remember be kind with the author and all the community
            </p>
          </div>
        </div>
      </header>
      <div className="uk-comment-body uk-margin-bottom">
        <div className="uk-margin">
          <textarea
            className="uk-textarea"
            rows={3}
            placeholder="What do you think?"
            {...formik.getFieldProps("comment")}
          />
        </div>
        {t(formik.touched.comment).safeObject &&
        t(formik.errors.comment).safeObject ? (
          <div className="uk-text-danger uk-text-bold">
            {formik.errors.comment}
          </div>
        ) : null}
        <div className="uk-align-right">
          {t(disabled).isTrue ? (
            <div uk-spinner="ratio:1.2" className="divSalmon"></div>
          ) : (
            <input
              type="submit"
              disabled={disabled}
              value="Comment"
              className="uk-button uk-button-primary"
            />
          )}
        </div>
      </div>
    </Form>
  );
};

export default CommentBox;
