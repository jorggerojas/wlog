import { createUseStyles } from "react-jss";

const globalLight = createUseStyles({
  "@global": {
    body: {
      background: "rgba(253, 119, 119, .1)",
    },
  },
  navColor: {
    background: "#FD7777 !important",
  },
  padd: {
    padding: "0 0.6em",
  },
  whiteText: {
    color: "#FFFFFF !important",
  },
});

const globalDark = createUseStyles({
  navColor: {
    background: "#0D1117 !important",
  },
  padd: {
    padding: "2em",
  },
});

export { globalLight, globalDark };
