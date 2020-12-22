import { defaultThemes } from "react-data-table-component";
import t from "typy";

const options = {
  rowsPerPageText: "Filas por página:",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos",
};

const customStyles = (theme: any) => ({
  header: {
    style: {
      display: "none",
    },
  },
  table: {
    style: {
      backgroundColor: "none",
      overflow: "hidden",
    },
  },
  headRow: {
    style: {
      borderTopWidth: "1px",
      backgroundColor: t(theme).isFalse ? "#fd7777" : "#18181B !important",
      borderTopColor: defaultThemes.default.divider.default,
      overflow: "hidden",
      "&:hover": {
        color: t(theme).isTrue ? "#fd7777 !important" : "#18181B !important",
      },
      "&:focus": {
        color: t(theme).isTrue ? "#fd7777 !important" : "#18181B !important",
      },
      "&:active": {
        color: t(theme).isTrue ? "#fd7777 !important" : "#18181B !important",
      },
    },
  },
  headCells: {
    style: {
      backgroundColor: t(theme).isFalse ? "#fd7777" : "#18181B !important",
      overflow: "hidden",
      color: "white !important",
      fontSize: "1.1em",
      "&:hover": {
        color: "white !important",
      },
      "&:focus": {
        color: "white !important",
      },
    },
    activeSortStyle: {
      color: t(theme).isTrue ? "#fd7777" : "#18181B !important",
      "&:focus": {
        outline: "none",
        color: t(theme).isTrue ? "#fd7777" : "#18181B !important",
      },
      "&:hover:not(:focus)": {
        color: t(theme).isTrue ? "#fd7777" : "#18181B !important",
      },
    },
  },
  cells: {
    style: {
      backgroundColor: t(theme).isTrue
        ? "rgba(24, 24, 27, .95) !important"
        : "rgba(253, 119, 119, .4) !important",
      overflow: "hidden",
      color: t(theme).isFalse ? "#18181B !important" : "#eee !important",
      padding: ".6rem",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
      fontWeight: 600,
      color: t(theme).isTrue ? "#eee" : "#333",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: "red",
      fill: "red",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "#999",
        fill: "#999",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "none",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "none",
        color: t(theme).isTrue ? "#eee" : "#333",
      },
    },
  },
});

export { options, customStyles };
