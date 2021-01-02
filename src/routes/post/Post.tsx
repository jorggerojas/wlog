// @flow
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import t from "typy";
import anime from "animejs";
import Header from "../main/components/Header";
import { loadStorage, parseDate, setInStorage, URL } from "../../config";
import { setKey, deleteKey, deletePost } from "./helpers/postHelpers";
import Comment from "./components/Comment";
import Loading from "../loading/Loading";
import CommentBox from "./components/CommentBox";
import {
  TitlePost,
  TextChange,
  LinkUser,
  AccordionTitle,
  SpanBadge,
  Title4,
  InputPost,
  TextAreaPost,
  Submit,
} from "../../styles/text";
import { DivSalmon, CommentContainer } from "../../styles/containers";
import NoMatch from "../NoMatch";

interface PostProps {
  theme: boolean;
  handle: Function;
}

const Post = ({ theme, handle }: PostProps) => {
  const [load, setLoad] = useState(false);
  const [keywordList, setKeywordList] = useState([""]);
  const [inputs, setInputs] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [empty, setEmpty] = useState(false);
  const { user, id } = useParams<{ user: string; id: string }>();
  const [comments, setComments] = useState([]);
  const [pageCountPosts, setpageCountPost] = useState(1);
  const getComments = (page?: number, size?: number) => {
    return axios.get(
      `${URL}/users/all/posts/${id}/comments?page=${page ?? 0}&size=${
        size ?? 5
      }`
    );
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
  const getPostData = () => {
    return axios.get(`${URL}/users/${user}/posts/${id}`);
  };
  useEffect(() => {
    getPostData()
      .then((response: any) => {
        loadStorage("ROLE") === "ADMIN" || user === response.data.username
          ? setUpdateInfo(true)
          : setUpdateInfo(false);
        setKeywordList(response.data.keywords);
        setInStorage("content", JSON.stringify(response.data));
        getComments(0, 5)
          .then(({ data }: any) => {
            setComments(data.content);
            setpageCountPost(Math.ceil(data.totalElements / 4));
          })
          .catch(() => {
            setComments([]);
          });
      })
      .catch(() => {
        setNoMatch(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: {
      title: !t(loadStorage("content")).isNullOrUndefined
        ? JSON.parse(loadStorage("content")).title
        : "",
      summary: !t(loadStorage("content")).isNullOrUndefined
        ? JSON.parse(loadStorage("content")).summary
        : "",
      content: !t(loadStorage("content")).isNullOrUndefined
        ? JSON.parse(loadStorage("content")).content
        : "",
      keywords: !t(loadStorage("content")).isNullOrUndefined
        ? JSON.parse(loadStorage("content")).keywords
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
    onSubmit: function (values: any) {
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
            Authorization: `Bearer ${loadStorage("TOKEN")}`,
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
          .catch((error: any) => {
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
  const animation = anime({
    targets: "input[type='text'], input[type='password']",
    translateX: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 0].map(
      (num: Number) => num
    ),
    duration: 100,
    loop: 2,
    autoplay: false,
    direction: "reverse",
  });
  if (t(noMatch).isTrue) return <NoMatch theme={theme} handle={handle} />;
  if (t(load).isTrue) return <Loading load={load} />;
  return (
    <DivSalmon className="uk-animation-fade">
      <Header theme={theme} handle={handle} />
      <div className="uk-padding">
        <div>
          <TitlePost className="uk-text-left uk-text-bold uk-text-italic">
            {!t(loadStorage("content")).isNullOrUndefined
              ? JSON.parse(loadStorage("content")).title
              : ""}{" "}
            {t(updateInfo).isTrue ? (
              <span>
                {t(inputs).isTrue ? (
                  <span
                    uk-icon="close"
                    className="pointer red"
                    onClick={() => setInputs(false)}
                  ></span>
                ) : (
                  <span
                    uk-icon="pencil"
                    className="pointer blue"
                    onClick={() => setInputs(true)}
                  ></span>
                )}{" "}
                <span
                  className={`${
                    t(inputs).isTrue ? "uk-hidden" : "uk-visible"
                  } pointer red`}
                  uk-icon="trash"
                  onClick={() => deletePost(user, id, setLoad)}
                ></span>
              </span>
            ) : null}
          </TitlePost>
          <TextChange className="uk-text-meta uk-text-light">
            Created by {""}
            <LinkUser href={`/user/${user}`}>
              {user.toUpperCase()}
            </LinkUser> on {""}
            {parseDate(
              JSON.parse(loadStorage("content")).dateLog ?? "2020-12-12"
            )}
          </TextChange>
          <form className="post uk-align-center" onSubmit={formik.handleSubmit}>
            <ul uk-accordion="multiple: true">
              {t(inputs).isTrue ? (
                <li className="uk-open">
                  <Link className="uk-accordion-title" to="#">
                    <AccordionTitle>Title</AccordionTitle>
                  </Link>
                  <div className="uk-accordion-content">
                    <div className="uk-padding-small">
                      <InputPost
                        className="uk-input"
                        type="text"
                        placeholder="Something cool..."
                        {...formik.getFieldProps("title")}
                      />
                    </div>
                    {t(formik.touched.title).isTrue &&
                    !t(formik.errors.title).isNullOrUndefined ? (
                      <div className="uk-text-danger uk-text-bold">
                        {formik.errors.title}
                        {!t(formik.errors.title).isNullOrUndefined
                          ? animation.play()
                          : animation.pause()}
                      </div>
                    ) : null}
                  </div>
                </li>
              ) : null}
              <li uk-accordion="multiple:true">
                <Link className="uk-accordion-title" to="#">
                  <AccordionTitle>Summary</AccordionTitle>
                </Link>
                <div className="uk-accordion-content">
                  <div className="uk-padding-small">
                    {t(inputs).isTrue ? (
                      <TextAreaPost
                        className="uk-textarea"
                        rows={3}
                        placeholder="Something short and cool"
                        {...formik.getFieldProps("summary")}
                      />
                    ) : (
                      <TextChange>
                        {!t(loadStorage("content")).isNullOrUndefined
                          ? JSON.parse(loadStorage("content")).summary
                          : ""}
                      </TextChange>
                    )}
                  </div>
                  {t(formik.touched.summary).isTrue &&
                  !t(formik.errors.summary).isNullOrUndefined ? (
                    <div className="uk-text-danger uk-text-bold">
                      {formik.errors.summary}
                      {!t(formik.errors.summary).isNullOrUndefined
                        ? animation.play()
                        : animation.pause()}
                    </div>
                  ) : null}
                </div>
              </li>
              <li uk-accordion="multiple:true">
                <Link className="uk-accordion-title" to="#">
                  <AccordionTitle>Content</AccordionTitle>
                </Link>
                <div className="uk-accordion-content">
                  <div className="uk-padding-small">
                    {t(inputs).isTrue ? (
                      <TextAreaPost
                        className="uk-textarea"
                        rows={10}
                        placeholder="All you need is type"
                        {...formik.getFieldProps("content")}
                      />
                    ) : (
                      <TextChange>
                        {!t(loadStorage("content")).isNullOrUndefined
                          ? JSON.parse(loadStorage("content")).content
                          : ""}
                      </TextChange>
                    )}
                  </div>
                  {t(formik.touched.content).isTrue &&
                  !t(formik.errors.content).isNullOrUndefined ? (
                    <div className="uk-text-danger uk-text-bold">
                      {formik.errors.content}
                      {!t(formik.errors.content).isNullOrUndefined
                        ? animation.play()
                        : animation.pause()}
                    </div>
                  ) : null}
                </div>
              </li>
              <li uk-accordion="multiple:true">
                <Link className="uk-accordion-title" to="#">
                  <AccordionTitle>Keywords</AccordionTitle>
                </Link>
                <div className="uk-accordion-content">
                  <div className=" uk-padding-small">
                    {t(inputs).isTrue ? (
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
                        <InputPost
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
                            {t(empty).isTrue
                              ? animation.play()
                              : animation.pause()}
                          </div>
                        ) : null}
                        <div className="uk-placeholder uk-text-center">
                          {keywordList.map((keyword: string) => {
                            return (
                              <SpanBadge
                                key={keyword}
                                onClick={(e) =>
                                  deleteKey(keywordList, setKeywordList, e)
                                }
                                className="key uk-margin-small-right uk-badge uk-padding-small"
                              >
                                {keyword.toUpperCase()}
                              </SpanBadge>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="uk-text-center">
                        {!t(loadStorage("content")).isNullOrUndefined
                          ? (
                              JSON.parse(loadStorage("content")).keywords ?? []
                            ).map((keyword: string) => {
                              return (
                                <SpanBadge
                                  key={keyword}
                                  className="uk-margin-small-right uk-badge uk-padding-small"
                                >
                                  {keyword.toUpperCase()}
                                </SpanBadge>
                              );
                            })
                          : null}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
            {t(inputs).isTrue ? (
              <div className="uk-margin uk-padding-small uk-text-right">
                <Submit
                  className="uk-button uk-button-primary"
                  type="submit"
                  value="Save"
                />
              </div>
            ) : null}
          </form>
          {t(inputs).isTrue ? (
            ""
          ) : (
            // Comments
            <div>
              <div className="uk-margin-bottom">
                <CommentBox
                  post={id}
                  setComments={setComments}
                  getComments={getComments}
                />
              </div>
              <CommentContainer className="uk-section uk-section-default uk-padding-small">
                {t(comments).safeArray && !t(comments).isEmptyArray ? (
                  <Title4>Comments in this post</Title4>
                ) : null}
                {t(comments).safeArray && !t(comments).isEmptyArray ? (
                  comments.map((comment: any) => (
                    <Comment
                      key={comment.index}
                      id={comment.index}
                      post={id}
                      date={comment.dateLog}
                      comment={comment.content}
                      user={comment.user}
                    />
                  ))
                ) : (
                  <Title4 className="uk-text-center uk-text-italic">
                    No comments in this post
                  </Title4>
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
              </CommentContainer>
            </div>
          )}
        </div>
      </div>
    </DivSalmon>
  );
};
export default Post;
