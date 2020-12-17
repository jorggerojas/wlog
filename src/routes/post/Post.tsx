import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../main/components/Header";
import axios from "axios";
import cookie from "react-cookies";
import { parseDate, URL } from "../../config";

const Post = () => {
  const { user, id } = JSON.parse(JSON.stringify(useParams()));
  const [updateInfo, setUpdateInfo] = useState(false);
  const [data, setData] = useState({
    id: "",
    title: "",
    summary: "",
    dateLog: "",
    username: "",
    content: "",
    keywords: [],
    comments: [],
  });
  const getPostInfo = () => {
    return axios.get(`${URL}/users/${user}/posts/${id}`);
  };
  const actions = () => {
    cookie.load("ROLE") === "ADMIN" || user === data.username
      ? setUpdateInfo(true)
      : setUpdateInfo(false);
  };
  useEffect(() => {
    // actions();
    getPostInfo().then(({ data }: any) => {
      setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let update = updateInfo;
  let {
    title,
    summary,
    dateLog,
    username,
    content,
    keywords /*comments*/,
  } = data;
  return (
    <div className="uk-animation-fade">
      <Header />
      <div className="uk-padding">
        <h1 className="uk-text-left uk-text-bold uk-text-italic">
          {title}{" "}
          <span
            uk-icon="pencil"
            style={{ cursor: "pointer", color: "#0F7AE5" }}
          ></span>{" "}
          <span
            uk-icon="trash"
            style={{ cursor: "pointer", color: "red" }}
          ></span>
        </h1>
        <p className="uk-text-meta uk-text-light">
          Created by:{" "}
          <span>
            <Link to={`/user/${user}`}>{user.toUpperCase()}</Link>
          </span>{" "}
          on {""}
          {parseDate(dateLog)}
        </p>
        <div className="post uk-align-center">
          <ul uk-accordion="multiple: true">
            {update ? (
              <li>
                <Link className="uk-accordion-title" to="#s">
                  <legend className="uk-legend">Title</legend>
                </Link>
                <div className="uk-accordion-content">
                  <div className="uk-margin">
                    <input
                      className="uk-input"
                      type="text"
                      placeholder="Something cool..."
                    />
                  </div>
                </div>
              </li>
            ) : null}
            <li uk-accordion="multiple:true">
              <Link className="uk-accordion-title" to="#s">
                <legend className="uk-legend">Summary</legend>
              </Link>
              <div className="uk-accordion-content">
                <div className="uk-margin uk-padding-small">
                  {update ? (
                    <textarea
                      className="uk-textarea"
                      rows={3}
                      style={{ resize: "none" }}
                      placeholder="Something short and cool"
                    ></textarea>
                  ) : (
                    summary
                  )}
                </div>
              </div>
            </li>
            <li uk-accordion="multiple:true">
              <Link className="uk-accordion-title" to="#s">
                <legend className="uk-legend">Content</legend>
              </Link>
              <div className="uk-accordion-content">
                <div className="uk-margin uk-padding-small">
                  {update ? (
                    <textarea
                      className="uk-textarea"
                      rows={10}
                      placeholder="All you need is type"
                      style={{ resize: "none" }}
                    ></textarea>
                  ) : (
                    content
                  )}
                </div>
              </div>
            </li>
            <li uk-accordion="multiple:true">
              <Link className="uk-accordion-title" to="#s">
                <legend className="uk-legend">Keywords</legend>
              </Link>
              <div className="uk-accordion-content">
                <div className="uk-margin uk-padding-small">
                  {update ? (
                    <div>
                      <p className="uk-text-meta uk-text-small">
                        Press the key{" "}
                        <span className="uk-text-italic">"Enter"</span> ,{" "}
                        <span className="uk-text-italic">"Space"</span> ,{" "}
                        <span className="uk-text-italic">"." (period)</span> or{" "}
                        <span className="uk-text-italic">"," (comma)</span> for
                        add the word to the list.
                      </p>
                      <input
                        className="uk-input"
                        type="text"
                        id="keywords"
                        placeholder="Pocas e importantes"
                      />
                      <div
                        className="uk-placeholder uk-text-center"
                        id="placeWords"
                      ></div>
                    </div>
                  ) : (
                    <div className="uk-text-center">
                      {keywords.map((keyword: string) => {
                        return (
                          <span
                            key={keyword}
                            className="uk-margin-small-right uk-badge uk-padding-small"
                          >
                            {keyword}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
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
                    id="myComment"
                    style={{ resize: "none" }}
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
          <div id="comments">
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
                    <Link className="uk-link-reset" to={`/user/${username}`}>
                      {username}
                    </Link>
                  </p>
                  {update ? (
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
      </div>
    </div>
  );
};
export default Post;
