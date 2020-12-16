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
import { URL } from "../../config";

const User = () => {
  const { USER, ROLE } = cookie.loadAll();
  const [role, setRole] = useState("LECTOR");
  const { username } = JSON.parse(JSON.stringify(useParams()));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setUserData] = useState();
  useEffect(() => {
    axios.get(`${URL}/users/${username}`).then(({ data }: any) => {
      setRole(data.role[0]);
      setUserData(data);
    });
  }, [username]);
  const data = [
    { title: "POSTS", isActive: true },
    { title: "COMMENTS", isActive: false },
  ];
  if (USER === undefined) {
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
              <Badge
                link={true}
                key={data[1].title}
                title={data[1].title}
                isActive={data[1].isActive}
                target={"1"}
              />
            </ul>
            <ul className="uk-switcher uk-margin">
              <li className="uk-active">
                <div
                  className="uk-grid uk-grid-match uk-child-width-1-1@s uk-child-width-1-2@m "
                  uk-grid=""
                >
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={
                        "México es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es cool"
                      }
                      badge={"Country"}
                      id={"3"}
                    />
                  </div>
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={"mammmmmberrrroi"}
                      badge={"Country"}
                      id={"2"}
                    />
                  </div>
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={"mammmmmberrrroi"}
                      badge={"Country"}
                      id={"2"}
                    />
                  </div>
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={"mammmmmberrrroi"}
                      badge={"Country"}
                      id={"2"}
                    />
                  </div>
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={"mammmmmberrrroi"}
                      badge={"Country"}
                      id={"2"}
                    />
                  </div>
                  <div className="uk-margin-bottom match">
                    <PostMinified
                      title={"México"}
                      date={"2020-12-12"}
                      summary={"mammmmmberrrroi"}
                      badge={"Country"}
                      id={"2"}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="uk-grid uk-grid-match uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl"
                  uk-grid=""
                >
                  <div className="uk-margin-small-bottom">
                    <Comment
                      id={"1"}
                      comment={"cHingón"}
                      date={"2020-12-12"}
                      post={"mÉxiCO"}
                    />
                  </div>
                  <div className="uk-margin-small-bottom">
                    <Comment
                      id={"1"}
                      comment={
                        "Es una mamada que vengas a decir cosas que no son"
                      }
                      date={"2020-12-12"}
                      post={"mÉxiCO"}
                    />
                  </div>
                  <div className="uk-margin-small-bottom">
                    <Comment
                      id={"1"}
                      comment={"cHingón"}
                      date={"2020-12-12"}
                      post={"mÉxiCO"}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="uk-width-1-3@m uk-flex-first">
            <div uk-sticky="media: @m; top: 15vh; offset:15vh; animation: uk-animation-slide-top-small">
              <Data
                username={username}
                date={"2020-12-12"}
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
