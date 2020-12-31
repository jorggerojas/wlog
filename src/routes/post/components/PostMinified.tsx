// @flow
import React from "react";
import { Link, useParams } from "react-router-dom";
import { LinkUserComment, SpanBadge, Title3 } from "../../../styles/text";
import { CardBody, DivBadge } from "../../../styles/containers";

interface PostProps {
  title: string;
  date: string;
  user?: string;
  summary: string;
  badge: string;
  large?: boolean;
  id: string;
}

const PostMinified = ({
  title,
  date,
  user,
  summary,
  badge,
  id,
  large,
}: PostProps) => {
  const { username } = useParams<{ username: string }>();
  return (
    <div>
      <CardBody
        className={`uk-card-${
          large ? "large" : "small"
        }  uk-card uk-card-default uk-card-hover`}
      >
        <div className="uk-card-header uk-margin-remove-bottom">
          <Title3 className="uk-card-title uk-margin-remove-bottom">
            <Link
              to={`/user/${user ?? username}/post/${id}`}
              className="uk-link-heading uk-link-reset"
            >
              {title.length > 17
                ? title.toUpperCase().substr(0, 14) + "..."
                : title.toUpperCase()}
            </Link>
          </Title3>
          {user ? (
            <DivBadge className="uk-card-badge uk-label uk-text-uppercase uk-visible@s">
              {badge}
            </DivBadge>
          ) : null}
          <div
            className={`${
              !user ? "" : "uk-hidden@s"
            } uk-margin-small uk-margin-remove-top`}
          >
            <SpanBadge className="uk-badge">{badge.toUpperCase()}</SpanBadge>
          </div>
          {user ? (
            <p className="uk-text-meta uk-text-italic uk-margin-remove-top">
              <time>{date}</time> by{" "}
              <Link to={`/user/${user}`} className="uk-button-text">
                {user.toUpperCase()}
              </Link>
            </p>
          ) : (
            <p className="uk-text-meta uk-text-italic uk-margin-remove-top">
              <time>{date}</time>
            </p>
          )}
        </div>
        <div className="uk-padding uk-text-break">
          <p className="uk-text-italic  uk-visible@s">
            {summary.length > 200 ? summary.slice(0, 150) + "..." : summary}
          </p>
          <LinkUserComment
            href={`/user/${user ?? username}/post/${id}`}
            className=" uk-button uk-button-text"
          >
            Read more...
          </LinkUserComment>
        </div>
      </CardBody>
    </div>
  );
};

export default PostMinified;
