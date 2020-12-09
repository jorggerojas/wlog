import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

interface PostProps {
  title: string;
  date: string;
  user: string;
  summary: string;
  badge: string;
  id: string;
}

const PostMinified = ({ title, date, user, summary, badge, id }: PostProps) => {
  return (
    <div>
      <div className="uk-card-large  uk-card uk-card-default uk-card-hover">
        <div className="uk-card-header">
          <h3 className="uk-card-title">{title.toUpperCase()}</h3>
          <div className="uk-card-badge uk-label uk-text-uppercase">
            {badge}
          </div>
          <p className="uk-text-meta uk-text-italic uk-margin-remove-top">
            <time>Created on {date}</time> by{" "}
            <Router>
              <Link to="" className="uk-button-text">
                {user.toUpperCase()}
              </Link>
            </Router>
          </p>
        </div>
        <div className="uk-card-body uk-text-break">
          <p className="uk-text-italic">
            {summary.length > 200 ? summary.slice(0, 150) + "..." : summary}
          </p>
          <a href="#s" className=" uk-button uk-button-text">
            Read more...
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostMinified;
