import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../main/components/Header";
import axios from "axios";
import cookie from "react-cookies";
import { parseDate, URL } from "../../config";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import Loading from "../loading/Loading";

const Post = () => {
  const [load, setLoad] = useState(false);
  const { user, id } = JSON.parse(JSON.stringify(useParams()));
  const [keywordList, setKeywordList] = useState([""]);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [data, setData] = useState({
    id: "",
    title: "",
    summary: "",
    dateLog: "2020-07-19",
    username: "",
    content: "",
    keywords: [],
    comments: [],
  });
  useEffect(() => {
    axios.get(`${URL}/users/${user}/posts/${id}`).then((response: any) => {
      cookie.load("ROLE") === "ADMIN" || user === response.data.username
        ? setUpdateInfo(true)
        : setUpdateInfo(false);
      setData(response.data);
      setKeywordList(response.data.keywords);
      cookie.save("content", response.data, { path: "/" });
    });
  }, [id, user]);
  let {
    title,
    summary,
    dateLog,
    username,
    content,
    keywords /*comments*/,
  } = data;
  const formik = useFormik({
    initialValues: {
      title: cookie.load("content").title,
      summary: cookie.load("content").summary,
      content: cookie.load("content").content,
      keywords: cookie.load("content").keywords,
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
    onSubmit: function (values) {
      if (keywordList.length <= 0) {
        setEmpty(true);
        return;
      } else {
        setEmpty(false);
        setLoad(true);
        axios({
          method: "put",
          url: `${URL}/users/${user}/posts/${id}`,
          headers: {
            Authorization: `Bearer ${cookie.load("TOKEN")}`,
          },
          data: {
            title: values.title,
            content: values.content,
            user: user,
            summary: values.summary,
            keywords: keywordList,
            isSaved: 0,
          },
        })
          .then(() => {
            setLoad(false);
            setTimeout(() => {
              swal("Post updated").then(() => {
                window.location.reload();
              });
            }, 500);
          })
          .catch((error) => {
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              swal("You don't have the permission to update the post").then(
                () => {
                  setLoad(false);
                  window.location.reload();
                }
              );
            } else if (error.response.status === 404) {
              swal(
                "You can't delete the post because is missing or not exist anymore"
              ).then(() => {
                setLoad(false);
                window.location.reload();
              });
            } else {
              swal("You can't do it now, try again later").then(() => {
                setLoad(false);
                window.location.reload();
              });
            }
          });
      }
    },
  });
  const setKey = ({ keyCode, target }: any) => {
    if (keyCode === 13 || keyCode === 32) {
      var list = keywordList.map((key) => key.trim());
      list.includes(target.value)
        ? swal("You can't add the same keyword")
        : list.push(target.value.replaceAll(",", "").replaceAll(".", ""));
      setKeywordList(list);
      target.value = "";
    }
  };
  const deleteKey = ({ target }: any) => {
    var list = keywordList.map((key) => key.trim());
    var index = list.indexOf(target.innerText.toLowerCase());
    if (index > -1) {
      list.splice(index, 1);
      setKeywordList(list);
    }
  };
  const deletePost = () => {
    swal({
      title: "Are you sure wanna delete this post?",
      text: "The comments will be deleted too",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancel",
          visible: true,
        },
        ok: {
          visible: true,
          text: "Yes, delete post",
        },
      },
    }).then((willDelete) => {
      if (willDelete) {
        setLoad(true);
        setTimeout(() => {
          axios({
            method: "delete",
            url: `${URL}/users/${user}/posts/${id}`,
            headers: {
              Authorization: `Bearer ${cookie.load("TOKEN")}`,
            },
          })
            .then(() => {
              swal("Post deleted").then(() => {
                setLoad(false);
                window.location.href = "/";
              });
            })
            .catch((error) => {
              if (error.response.status === 404) {
                swal(
                  "You can't delete the post because is missing or not exist anymore"
                ).then(() => {
                  setLoad(false);
                  window.location.reload();
                });
              } else {
                swal(
                  "You can't delete the post because you don't have permission to do it"
                ).then(() => {
                  setLoad(false);
                  window.location.reload();
                });
              }
            });
        }, 500);
      } else return;
    });
  };
  return (
    <div className="uk-animation-fade">
      <Header />
      <div className="uk-padding">
        {load ? (
          <Loading load={load} />
        ) : (
          <div>
            <h1 className="uk-text-left uk-text-bold uk-text-italic">
              {title}{" "}
              {updateInfo ? (
                <span>
                  {inputs ? (
                    <span
                      uk-icon="close"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => setInputs(false)}
                    ></span>
                  ) : (
                    <span
                      uk-icon="pencil"
                      style={{ cursor: "pointer", color: "#0F7AE5" }}
                      onClick={() => setInputs(true)}
                    ></span>
                  )}{" "}
                  <span
                    className={`${inputs ? "uk-hidden" : "uk-visible"}`}
                    uk-icon="trash"
                    onClick={deletePost}
                    style={{ cursor: "pointer", color: "red" }}
                  ></span>
                </span>
              ) : null}
            </h1>
            <p className="uk-text-meta uk-text-light">
              Created by:{" "}
              <span>
                <Link to={`/user/${user}`}>{user.toUpperCase()}</Link>
              </span>{" "}
              on {""}
              {parseDate(dateLog)}
            </p>
            {/* cc */}
            <form
              className="post uk-align-center"
              onSubmit={formik.handleSubmit}
            >
              <ul uk-accordion="multiple: true">
                {inputs ? (
                  <li className="uk-open">
                    <Link className="uk-accordion-title" to="#s">
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
                      </div>
                      {formik.touched.title && formik.errors.title ? (
                        <div className="uk-text-danger uk-text-bold">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ) : null}
                <li uk-accordion="multiple:true">
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Summary</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      {inputs ? (
                        <textarea
                          className="uk-textarea"
                          rows={3}
                          style={{ resize: "none" }}
                          placeholder="Something short and cool"
                          {...formik.getFieldProps("summary")}
                        />
                      ) : (
                        summary
                      )}
                    </div>
                    {formik.touched.summary && formik.errors.summary ? (
                      <div className="uk-text-danger uk-text-bold">
                        {formik.errors.summary}
                      </div>
                    ) : null}
                  </div>
                </li>
                <li uk-accordion="multiple:true">
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Content</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      {inputs ? (
                        <textarea
                          className="uk-textarea"
                          rows={10}
                          placeholder="All you need is type"
                          style={{ resize: "none" }}
                          {...formik.getFieldProps("content")}
                        />
                      ) : (
                        content
                      )}
                    </div>
                    {formik.touched.content && formik.errors.content ? (
                      <div className="uk-text-danger uk-text-bold">
                        {formik.errors.content}
                      </div>
                    ) : null}
                  </div>
                </li>
                <li uk-accordion="multiple:true">
                  <Link className="uk-accordion-title" to="#">
                    <legend className="uk-legend">Keywords</legend>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-margin uk-padding-small">
                      {inputs ? (
                        <div>
                          <p className="uk-text-meta uk-text-small">
                            Press the key{" "}
                            <span className="uk-text-italic">"Enter"</span> ,{" "}
                            <span className="uk-text-italic">"Space"</span> ,
                            add the word to the list.
                          </p>
                          <input
                            className="uk-input"
                            type="text"
                            placeholder="Few and cool words"
                            defaultValue={""}
                            onKeyUp={setKey}
                          />
                          {empty === true ? (
                            <div className="uk-text-danger uk-text-bold">
                              Remember set least one keyword
                            </div>
                          ) : null}
                          <div className="uk-placeholder uk-text-center">
                            {keywordList.map((keyword: string) => {
                              return (
                                <span
                                  key={keyword}
                                  onClick={deleteKey}
                                  className="key uk-margin-small-right uk-badge uk-padding-small"
                                >
                                  {keyword.toUpperCase()}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="uk-text-center">
                          {keywords.map((keyword: string) => {
                            return (
                              <span
                                key={keyword}
                                className="uk-margin-small-right uk-badge uk-padding-small"
                              >
                                {keyword.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              {inputs ? (
                <div className="uk-margin uk-padding-small uk-text-right">
                  <input
                    className="uk-button uk-button-primary"
                    type="submit"
                    value="Save"
                  />
                </div>
              ) : null}
            </form>
            {/* jjj */}
            {inputs ? (
              ""
            ) : (
              <div>
                <div className="uk-margin-bottom">
                  <article
                    className="uk-comment uk-comment-primary"
                    style={{ minHeight: "13rem !important" }}
                  >
                    <header
                      className="uk-comment-header uk-grid uk-flex-middle"
                      uk-grid={""}
                    >
                      <div className="uk-width-1-2@s uk-grid" uk-grid="">
                        <div className="uk-width-1-1@s">
                          <h4 className="uk-comment-title ">
                            Write a comment for this post
                          </h4>
                        </div>
                        <div className="uk-width-1-1@s uk-margin-bottom">
                          <p className=" uk-text-meta uk-margin">
                            Remember be kind with the author and all the
                            community
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="uk-comment-body uk-margin-bottom">
                      <div className="uk-margin">
                        <textarea
                          className="uk-textarea"
                          rows={3}
                          style={{ resize: "none" }}
                          defaultValue={""}
                          placeholder="What do you think?"
                        ></textarea>
                      </div>
                      <div className="uk-align-right">
                        <button className="uk-button uk-button-primary">
                          Comment
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
                <div>
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
                          <Link
                            className="uk-link-reset"
                            to={`/user/${username}`}
                          >
                            {username}
                          </Link>
                        </p>
                        {inputs ? (
                          <div className="uk-align-right">
                            <span
                              style={{ cursor: "pointer" }}
                              uk-icon="icon:close"
                            />
                          </div>
                        ) : null}
                        <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                          <li className="uk-text-italic">{"dateLog"}</li>
                        </ul>
                      </div>
                    </header>
                    <div className="uk-comment-body">
                      <p>Jajajajaja bien cool</p>
                    </div>
                  </article>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Post;
