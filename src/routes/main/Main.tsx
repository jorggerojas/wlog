import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import t from "typy";
import PostMinified from "../post/components/PostMinified";
import { parseDate, URL } from "../../config";
import Loading from "../loading/Loading";
import { LoadingContainer } from "../../styles/containers";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCountPosts, setpageCountPost] = useState(1);
  const getPosts = (page?: any) => {
    return axios.get(`${URL}/users/all/posts?size=6&page=${page ?? 0}`);
  };
  const changeContent = ({ selected }: any) => {
    getPosts(selected)
      .then(({ data }: any) => {
        setPosts(data.content);
      })
      .catch(() => {
        setPosts([]);
      });
  };
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(({ data }: any) => {
        setPosts(data.content);
        setpageCountPost(Math.ceil(data.totalElements / 6));
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch(() => {
        setPosts([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (t(loading).isTrue) {
    return (
      <LoadingContainer>
        <Loading load={loading} />
      </LoadingContainer>
    );
  }
  return (
    <div className={`${t(loading).isTrue ? "backLoad" : "transparent"}`}>
      <div
        className="uk-grid uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl uk-padding-large"
        uk-grid="masonry: true"
        uk-height-match="target: .card-target"
      >
        {!t(posts).isEmptyArray && posts.length ? (
          posts.map((post: any) => (
            <PostMinified
              key={post.index}
              large={true}
              title={post.title}
              date={parseDate(post.dateLog)}
              user={post.user}
              summary={post.summary}
              badge={post.keywords[0]}
              id={post.index}
            />
          ))
        ) : (
          <div className="uk-text-center uk-width-1-1">
            <p className="uk-text-center uk-text-italic">
              No hay post para mostrar
            </p>
          </div>
        )}
      </div>
      <div className="paginate uk-padding">
        <ReactPaginate
          pageCount={pageCountPosts}
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
    </div>
  );
};

export default Main;
