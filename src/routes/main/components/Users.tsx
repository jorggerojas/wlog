import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";

const data = [
  {
    role: "ADMIN",
    name: "Jorge Rojas",
    username: "jorggerojas",
    datelog: "2020-12-12",
  },
  {
    role: "LECTOR",
    name: "Luis Rojas",
    username: "luisarcos",
    datelog: "2020-12-13",
  },
  {
    role: "ADMIN",
    name: "Jorge Arcos",
    username: "mamberroi",
    datelog: "2020-12-14",
  },
  {
    role: "MODERADOR",
    name: "Juan Olvera",
    username: "papi",
    datelog: "2020-12-15",
  },
  {
    role: "ADMIN",
    name: "Luis Olvera",
    username: "luisolv",
    datelog: "2020-12-16",
  },
];
const columns = [
  {
    name: "ROLE",
    selector: "role",
    sortable: true,
    cell: (row: any) => (
      <select value={"ADMIN"} onChange={(e) => console.log(e.target.value)}>
        <option value="ADMIN">ADMIN</option>
      </select>
    ),
  },
  { name: "Name", selector: "name", sortable: true },
  { name: "Username", selector: "username", sortable: true },
  { name: "DateLog", selector: "datelog", sortable: true },
];
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
      backgroundColor: "transparent",
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
      overflow: "hidden",
    },
  },
  headCells: {
    style: {
      backgroundColor: "transparent",
      overflow: "hidden",
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

const Users = () => {
  return (
    <div className="uk-padding-small ">
      <DataTable
        data={data}
        columns={columns}
        pagination
        paginationComponentOptions={options}
        customStyles={customStyles}
      />
    </div>
  );
};

export default Users;
