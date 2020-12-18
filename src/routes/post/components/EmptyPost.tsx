import React, { useState } from "react";
import Header from "../../main/components/Header";
import { useFormik } from "formik";
import t from "typy";
import * as yup from "yup";
import swal from "sweetalert";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { deleteKey, setKey } from "../helpers/postHelpers";
import Loading from "../../loading/Loading";
import { URL } from "../../../config";

const EmptyPost = () => {
  const { USER, ROLE } = cookie.loadAll();
  const [load, setLoad] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [keywordList, setKeywordList] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      content: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Title is required")
        .min(2, "Title must has 2 characters or more"),
      summary: yup
        .string()
        .required("Summary is required")
        .min(2, "Summary must has 2 characters or more"),
      content: yup
        .string()
        .required("Content is required")
        .min(2, "Content must has 2 characters or more"),
    }),
    onSubmit: (values) => {
      if (keywordList.length <= 0) {
        setEmpty(true);
        return;
      } else {
        setEmpty(false);
        setLoad(true);
        axios({
          method: "post",
          url: `${URL}/users/${USER}/posts/`,
          headers: {
            Authorization: `Bearer ${cookie.load("TOKEN")}`,
          },
          data: {
            title: values.title,
            content: values.content,
            user: USER,
            summary: values.summary,
            keywords: keywordList,
            isSaved: 0,
          },
        })
          .then(() => {
            setTimeout(() => {
              swal("Post created").then(() => {
                setLoad(false);
                window.location.href = `/users/${USER}`;
              });
            }, 500);
          })
          .catch((error) => {
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              swal("You don't have the permission to create the post").then(
                () => {
                  setLoad(false);
                  window.location.href = "/";
                }
              );
            } else {
              swal("You can't do it now, try again later").then(() => {
                setLoad(false);
              });
            }
          });
      }
    },
  });
  if (ROLE !== "ADMIN" && ROLE !== "REDACTOR") {
    return (
      <div>
        {swal({
          title: "Wait!",
          text: "You need the permission to create posts",
          icon: "warning",
        }).then(() => {
          window.location.href = "/sign";
        })}
      </div>
    );
  }
  return (
    <div className="uk-animation-fade">
      <Header />
      {t(load).isTrue ? (
        <Loading load={load} />
      ) : (
        <div className="uk-padding">
          <div>
            <h2 className="uk-text-left">
              Create here your post, fill all the fields and share!
            </h2>
            <form
              className="post uk-align-center"
              onSubmit={formik.handleSubmit}
            >
              <ul uk-accordion="multiple: true">
                <li className="uk-open">
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Title</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <input
                        className="uk-input"
                        type="text"
                        placeholder="Something cool..."
                        {...formik.getFieldProps("title")}
                      />
                      {t(formik.touched.title).safeObject &&
                      t(formik.errors.title).safeObject ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Summary</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <textarea
                        className="uk-textarea"
                        rows={3}
                        style={{ resize: "none" }}
                        placeholder="Something short and cool"
                        {...formik.getFieldProps("summary")}
                      />
                      {t(formik.touched.summary).safeObject &&
                      t(formik.errors.summary).safeObject ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.summary}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Content</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <textarea
                        className="uk-textarea"
                        rows={10}
                        placeholder="All you need is type"
                        style={{ resize: "none" }}
                        {...formik.getFieldProps("content")}
                      />
                      {t(formik.touched.content).safeObject &&
                      t(formik.errors.content).safeObject ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.content}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Keywords</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      <div>
                        <p className="uk-text-meta uk-text-small">
                          Press the key{" "}
                          <span className="uk-text-italic">"Space"</span> or
                          <span className="uk-text-italic">"," (comma)</span> or
                          <span className="uk-text-italic">
                            "." (period)
                          </span>{" "}
                          to add the word to the list.
                        </p>
                        <input
                          className="uk-input"
                          type="text"
                          placeholder="Few and cool words"
                          defaultValue={""}
                          onKeyUp={(e) =>
                            setKey(keywordList, setKeywordList, e)
                          }
                        />
                        {t(empty).isTrue ? (
                          <div className="uk-text-danger uk-text-bold">
                            Remember set least one keyword
                          </div>
                        ) : null}
                        <div className="uk-placeholder uk-text-center">
                          {keywordList.map((keyword: string) => {
                            return (
                              <span
                                key={keyword}
                                onClick={(e) =>
                                  deleteKey(keywordList, setKeywordList, e)
                                }
                                className="key uk-margin-small-right uk-badge uk-padding-small"
                              >
                                {keyword.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="uk-margin uk-padding-small uk-text-right">
                <input
                  className="uk-button uk-button-primary"
                  type="submit"
                  value="Save"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyPost;
