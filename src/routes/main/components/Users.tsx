import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { loadStorage, URL } from "../../../config";
import { options, customStyles } from "./tableOptions";
import { Select, Option } from "../../../styles/text";

interface UserProps {
  theme?: boolean;
}

const Users = ({ theme }: UserProps) => {
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
          Authorization: `Bearer ${loadStorage("TOKEN")}`,
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
      sortable: true,
      cell: (row: any) => {
        return (
          <Select
            defaultValue={row.role ?? "REDACTOR"}
            className={" uk-text-bold"}
            onChange={(e) => changeValue(e.target.value, row.username ?? "...")}
          >
            <Option value="ADMIN">ADMIN</Option>
            <Option value="REDACTOR">REDACTOR</Option>
            <Option value="MODERADOR">MODERADOR</Option>
            <Option value="LECTOR">LECTOR</Option>
          </Select>
        );
      },
    },
    {
      name: "Full name",
      selector: "name",
      hide: 599,
      sortable: true,
      cell: (row: any) => {
        return row ? (
          <div className="uk-flex uk-flex-middle uk-flex-center">
            <p className="uk-text-bold">{row.name}</p>
          </div>
        ) : null;
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
          <p className="uk-text-bold">{row ? row.datelog : "..."}</p>
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
        customStyles={customStyles(theme)}
        className="uk-table"
        onChangePage={changeContent}
      />
    </div>
  );
};

export default Users;
