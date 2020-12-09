import React /*useState*/ from "react";

interface BadgeProps {
  data: Array<Object>;
}
const Badge = ({ data }: BadgeProps) => {
  //   const [active, setActive] = useState("false");
  return (
    <ul className="uk-subnav uk-subnav-pill uk-margin-small-left">
      {data.length
        ? data.map((badge: Object) => {
            const pill = JSON.parse(JSON.stringify(badge));
            return (
              <li key={pill.title} className={pill.isActive ? "uk-active" : ""}>
                <a href="#s">{pill.title}</a>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default Badge;
