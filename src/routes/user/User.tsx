import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import Badge from "../main/components/Badge";
import Header from "../main/components/Header";
import PostMinified from "../post/components/PostMinified";
import Data from "./components/Data";
import Comment from "./components/Comment";
import NoMatch from "../NoMatch";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { parseDate, URL } from "../../config";

const User = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setUserData] = useState();
  const [pageCountPost, setPageCountPost] = useState(1);
  const [pageCountComment, setPageCountComment] = useState(1);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { USER, ROLE } = cookie.loadAll();
  const [role, setRole] = useState("LECTOR");
  const [notFoundPosts, setPostsNotFound] = useState(false);
  const [notFoundComments, setCommentsNotFound] = useState(false);
  const [blocked, setBlocked] = useState("0");
  const [date, setDate] = useState("0000-00-00");
  const { username } = JSON.parse(JSON.stringify(useParams()));
  const getComments = (page?: number, size?: number) => {
    return axios.get(
      `${URL}/users/${username}/posts/all/comments?page=${page ?? 0}&size=${
        size ?? 5
      }`
    );
  };
  const changeContentComments = ({ selected }: any) => {
    getComments(selected)
      .then(({ data }: any) => {
        setComments(data.content);
      })
      .catch(() => {
        setComments([]);
        setCommentsNotFound(!notFoundComments);
      });
  };
  useEffect(() => {
    axios.get(`${URL}/users/${username}`).then(({ data }: any) => {
      setRole(data.role[0]);
      setDate(parseDate(data.dateLog));
      setUserData(data);
      setBlocked(data.isBlocked);
      axios
        .get(`${URL}/users/${username}/posts?size=4`)
        .then((response: any) => {
          setPageCountPost(Math.ceil(response.data.totalElements / 3));
          setPosts(response.data.content);
          if (ROLE === "ADMIN" || username === USER) {
            getComments()
              .then(({ data }: any) => {
                setPageCountComment(Math.ceil(response.data.totalElements / 3));
                setComments(data.content);
              })
              .catch(() => {
                setComments([]);
                setCommentsNotFound(!notFoundComments);
              });
          }
        })
        .catch(() => {
          setPosts([]);
          setPostsNotFound(!notFoundPosts);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  const changeContent = ({ selected }: any) => {
    axios
      .get(`${URL}/users/${username}/posts?page=${selected}&size=4`)
      .then(({ data }: any) => {
        setPosts(data.content);
      });
  };
  const data = [
    { title: "POSTS", isActive: true },
    { title: "COMMENTS", isActive: false },
  ];
  if (USER === undefined || blocked === "1") {
    return <NoMatch />;
  } else {
    return (
      <div className="uk-animation-fade">
        <Header />
        <div
          className="uk-flex-top uk-flex-center@s uk-padding-small"
          uk-grid=""
        >
          <div className="uk-width-2-3@m">
            <ul
              className="uk-subnav uk-subnav-pill uk-margin-remove-top"
              uk-switcher=""
            >
              <Badge
                link={true}
                key={data[0].title}
                title={data[0].title}
                isActive={data[0].isActive}
                target={"0"}
              />
              {ROLE === "ADMIN" || username === USER ? (
                <Badge
                  link={true}
                  key={data[1].title}
                  title={data[1].title}
                  isActive={data[1].isActive}
                  target={"1"}
                />
              ) : null}
            </ul>
            <ul className="uk-switcher uk-margin">
              <li className="uk-active">
                <div
                  className="uk-grid uk-grid-match uk-child-width-1-1@s uk-child-width-1-2@m "
                  uk-grid=""
                >
                  {posts.length ? (
                    posts.map((post: any) => (
                      <div className="uk-margin-bottom match" key={post.index}>
                        <PostMinified
                          title={post.title}
                          date={parseDate(post.dateLog)}
                          summary={post.summary}
                          badge={post.keywords[0]}
                          id={post.index}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="uk-text-center uk-margin">
                      <h4 className="uk-text-italic">No posts available</h4>
                    </div>
                  )}
                </div>
                {posts.length ? (
                  <div className="paginate">
                    <ReactPaginate
                      pageCount={pageCountPost}
                      onPageChange={changeContent}
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
              </li>
              {ROLE === "ADMIN" || username === USER ? (
                <li>
                  <div
                    className="uk-grid uk-grid-match uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl"
                    uk-grid=""
                  >
                    {comments.map((comment: any) => (
                      <div
                        className="uk-margin-small-bottom"
                        key={comment.index}
                      >
                        <Comment
                          id={comment.index}
                          comment={comment.content}
                          date={parseDate(comment.dateLog)}
                          post={comment.post}
                        />
                      </div>
                    ))}
                  </div>
                  {comments.length ? (
                    <div className="paginate">
                      <ReactPaginate
                        pageCount={pageCountComment}
                        onPageChange={changeContentComments}
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
                </li>
              ) : null}
            </ul>
          </div>
          <div className="uk-width-1-3@m uk-flex-first">
            <div uk-sticky="media: @m; top: 15vh; offset:15vh; animation: uk-animation-slide-top-small">
              <Data
                username={username}
                date={date}
                role={role}
                myAccount={username === USER}
                admin={ROLE === "ADMIN"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default User;
