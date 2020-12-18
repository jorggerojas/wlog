// @flow
import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

interface BadgeProps {
  title: string;
  isActive: boolean;
  link?: boolean;
  target?: string;
}
const Badge = ({ title, isActive, link, target }: BadgeProps) => {
  return (
    <li key={title} className={isActive ? "uk-active" : ""}>
      <Router>
        {link ? (
          <Link to="" uk-switcher-item={target ? `${target}` : ""}>
            {title}
          </Link>
        ) : (
          <Link to={""}>{title}</Link>
        )}
      </Router>
    </li>
  );
};

export default Badge;
