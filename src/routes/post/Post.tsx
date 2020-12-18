// @flow
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../main/components/Header";
import axios from "axios";
import cookie from "react-cookies";
import { parseDate, URL } from "../../config";
import { setKey, deleteKey, deletePost } from "./helpers/postHelpers";
import Comment from "./components/Comment";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import Loading from "../loading/Loading";
import t from "typy";
import ReactPaginate from "react-paginate";

const Post = () => {
  const [load, setLoad] = useState(false);
  const { user, id } = JSON.parse(JSON.stringify(useParams()));
  const [keywordList, setKeywordList] = useState([""]);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [comments, setComments] = useState([]);
  const [pageCountPosts, setpageCountPost] = useState(1);
  const [data, setData] = useState({
    id: "",
    title: "",
    summary: "",
    dateLog: "2020-07-19",
    username: "",
    content: "",
    keywords: [],
  });
  const getComments = (page?: number) => {
    return axios.get(`${URL}/users/all/posts/${id}/comments?page=${page ?? 0}`);
  };
  const changeComments = ({ selected }: any) => {
    getComments(selected)
      .then(({ data }: any) => {
        setComments(data.content);
      })
      .catch(() => {
        setComments([]);
      });
  };
  useEffect(() => {
    axios.get(`${URL}/users/${user}/posts/${id}`).then((response: any) => {
      cookie.load("ROLE") === "ADMIN" || user === response.data.username
        ? setUpdateInfo(true)
        : setUpdateInfo(false);
      setData(response.data);
      setKeywordList(response.data.keywords);
      cookie.save("content", response.data, { path: "/" });
      getComments()
        .then(({ data }: any) => {
          setComments(data.content);
          setpageCountPost(Math.ceil(data.totalElements / 5));
        })
        .catch(() => setComments([]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let { title, summary, dateLog, content, keywords } = data;
  const formik = useFormik({
    initialValues: {
      title: !t(cookie.load("content")).isUndefined
        ? cookie.load("content").title
        : "",
      summary: !t(cookie.load("content")).isUndefined
        ? cookie.load("content").summary
        : "",
      content: !t(cookie.load("content")).isUndefined
        ? cookie.load("content").content
        : "",
      keywords: !t(cookie.load("content")).isUndefined
        ? cookie.load("content").keywords
        : "",
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
  return (
    <div className="uk-animation-fade">
      <Header />
      <div className="uk-padding">
        {t(load).isTrue ? (
          <Loading load={load} />
        ) : (
          <div>
            <h1 className="uk-text-left uk-text-bold uk-text-italic">
              {title}{" "}
              {t(updateInfo).isTrue ? (
                <span>
                  {t(inputs).isTrue ? (
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
                    className={`${
                      t(inputs).isTrue ? "uk-hidden" : "uk-visible"
                    }`}
                    uk-icon="trash"
                    onClick={() => deletePost(user, id, setLoad)}
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
                {t(inputs).isTrue ? (
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
                      {t(formik.touched.title).safeObject &&
                      t(formik.errors.title).safeObject ? (
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
                      {t(inputs).isTrue ? (
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
                    {t(formik.touched.summary).safeObject &&
                    t(formik.errors.summary).safeObject ? (
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
                      {t(inputs).isTrue ? (
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
                    {t(formik.touched.content).safeObject &&
                    t(formik.errors.content).safeObject ? (
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
                      {t(inputs).isTrue ? (
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
              {t(inputs).isTrue ? (
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
            {t(inputs).isTrue ? (
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
                <div className="uk-section uk-section-default uk-padding-small">
                  {t(comments).safeArray && !t(comments).isEmptyArray ? (
                    <h4>Comments of this post</h4>
                  ) : null}
                  {t(comments).safeArray && !t(comments).isEmptyArray ? (
                    comments.map((comment: any) => (
                      <Comment
                        key={comment.index}
                        comment={comment.content}
                        user={comment.user}
                      />
                    ))
                  ) : (
                    <p className="uk-text-center uk-text-italic">
                      No comments in this post
                    </p>
                  )}
                  {t(comments).safeArray && !t(comments).isEmptyArray ? (
                    <div className="paginate">
                      <ReactPaginate
                        pageCount={pageCountPosts}
                        onPageChange={changeComments}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={4}
                        breakLabel="..."
                        activeClassName="uk-active active"
                        activeLinkClassName="uk-active active"
                        disabledClassName="uk-disabled"
                        nextClassName="uk-pagination-next"
                        previousClassName="uk-pagination-previous"
                        pageClassName=""
                        containerClassName="uk-pagination uk-flex-center"
                        nextLabel="Next"
                      />
                    </div>
                  ) : null}
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
