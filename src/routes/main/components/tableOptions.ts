import { defaultThemes } from "react-data-table-component";

const options = {
  rowsPerPageText: "Filas por página:",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos",
};

const customStyles = {
  header: {
    style: {
      backgroundColor: "transparent",
      display: "none",
    },
  },
  table: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      backgroundColor: "rgba(253, 119, 119, .6)",
      borderTopColor: defaultThemes.default.divider.default,
      overflow: "hidden",
    },
  },
  headCells: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
      color: "white",
      fontWeight: "700",
      fontSize: "1.1em",
    },
  },
  cells: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
    },
  },
};

export { options, customStyles };
