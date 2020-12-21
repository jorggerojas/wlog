import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import cookie from "react-cookies";
import { URL } from "../../../config";
import { customStyles, options } from "./tableOptions";
import { SalmonParagraph } from "../../../styles/styles";

const Users = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const getUsers = (page?: number) => {
    return axios.get(`${URL}/users?page=${page ?? 0}&size=10`);
  };
  const changeValue = (value: string, username: string) => {
    setDisabled(true);
    setTimeout(() => {
      axios({
        method: "put",
        url: `${URL}/users/${username}`,
        headers: {
          Authorization: `Bearer ${cookie.load("TOKEN")}`,
        },
        data: {
          role: [`${value}`],
        },
      }).then(() => {
        getUsers()
          .then(({ data }: any) => {
            setData(
              data.content.map((user: any) => {
                return {
                  key: user.nickname,
                  role: user.role[0],
                  name: user.name,
                  username: user.nickname,
                  datelog: user.dateLog,
                };
              })
            );
            setTotalElements(data.totalElements);
            setDisabled(false);
          })
          .catch(() => {
            setData([]);
          });
      });
    }, 500);
  };
  const columns = [
    {
      name: "Role",
      selector: "role",
      cell: (row: any) => {
        return (
          <select
            defaultValue={row.role ?? "REDACTOR"}
            className={"uk-select uk-text-bold"}
            onChange={(e) => changeValue(e.target.value, row.username ?? "...")}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="REDACTOR">REDACTOR</option>
            <option value="MODERADOR">MODERADOR</option>
            <option value="LECTOR">LECTOR</option>
          </select>
        );
      },
    },
    {
      name: "Full name",
      selector: "name",
      hide: 599,
      sortable: true,
      cell: (row: any) => {
        return row ? <p className="uk-text-bold">{row.name}</p> : null;
      },
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
      cell: (row: any) => {
        return row ? (
          <p className="uk-text-bold">
            {row && row.username ? row.username.toUpperCase() : "..."}
          </p>
        ) : null;
      },
    },
    {
      name: "Date log",
      selector: "datelog",
      sortable: true,
      hide: 959,
      cell: (row: any) => {
        return row ? (
          <SalmonParagraph className="uk-text-secondary">
            {row ? row.datelog : "..."}
          </SalmonParagraph>
        ) : null;
      },
    },
  ];
  useEffect(() => {
    getUsers()
      .then(({ data }: any) => {
        setData(
          data.content.map((user: any) => {
            return {
              key: user.nickname,
              role: user.role[0],
              name: user.name,
              username: user.nickname,
              datelog: user.dateLog,
            };
          })
        );
        setTotalElements(data.totalElements);
      })
      .catch(() => {
        setData([]);
      });
  }, []);
  const changeContent = (page: any) => {
    getUsers(page)
      .then(({ data }: any) => {
        setData(
          data.content.map((user: any) => {
            return {
              key: user.nickname,
              role: user.role[0],
              name: user.name,
              username: user.nickname,
              datelog: user.dateLog,
            };
          })
        );
        setTotalElements(data.totalElements);
      })
      .catch(() => {
        setData([]);
      });
  };
  return (
    <div className="uk-padding-small ">
      <DataTable
        data={data}
        columns={columns}
        responsive
        dense={false}
        disabled={disabled}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        paginationComponentOptions={options}
        customStyles={customStyles}
        className="uk-table"
        onChangePage={changeContent}
      />
    </div>
  );
};

export default Users;
