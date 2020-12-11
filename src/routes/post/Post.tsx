import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../main/components/Header";

const Post = () => {
  const { id } = JSON.parse(JSON.stringify(useParams()));
  let admin = false;
  const fakeData = {
    id: id,
    name: "México",
    summary: "Es cool",
    dateLog: "2020-12-12",
    username: "mamberroi",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi, fugiat perspiciatis, placeat magni ipsa, quasi quibusdam eaque doloribus obcaecati quidem. Ipsa corrupti quis quaerat laudantium repellendus incidunt hic facilis.",
    keywords: ["a", "b", "v", "d"],
    comments: [],
  };
  const {
    name,
    summary,
    dateLog,
    username,
    content,
    keywords,
    // comments,
  } = fakeData;
  return (
    <div>
      <Header />
      <div className="uk-padding">
        <h1 className="uk-text-left uk-text-bold uk-text-italic">"{name}"</h1>
        <p className="uk-text-meta uk-text-light">
          Created by:{" "}
          <span>
            <Link to={`/user/${username}`}>{username.toUpperCase()}</Link>
          </span>{" "}
          on {""}
          {dateLog.toUpperCase()}
        </p>
        <div className="post uk-align-center">
          <ul uk-accordion="multiple: true">
            {admin ? (
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
                  {admin ? (
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
                  {admin ? (
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
                  {admin ? (
                    <div>
                      <p className="uk-text-meta uk-text-small">
                        Presiona la tecla{" "}
                        <span className="uk-text-italic">"Enter"</span> ,{" "}
                        <span className="uk-text-italic">
                          "Space" (Espacio)
                        </span>{" "}
                        , <span className="uk-text-italic">"." (punto)</span> o{" "}
                        <span className="uk-text-italic">"," (coma)</span> para
                        agregar la palabra a la lista.
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
          <div id="setComment" className="uk-margin-bottom">
            <article
              className="uk-comment uk-comment-primary"
              style={{ minHeight: "13rem !important" }}
            >
              <header
                className="uk-comment-header uk-grid-medium uk-flex-middle"
                uk-grid={""}
              >
                <div className="uk-width-expand">
                  <h4 className="uk-comment-title uk-margin-remove">
                    Write a comment for this post
                  </h4>
                  <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li className="uk-text-italic uk-text-muted">
                      Remember be kind with the author and all the community
                    </li>
                  </ul>
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
                  {admin ? (
                    <div className="uk-align-right">
                      <span
                        style={{ cursor: "pointer" }}
                        uk-icon="icon:close"
                      />
                    </div>
                  ) : null}
                  <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li className="uk-text-italic">{dateLog}</li>
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
