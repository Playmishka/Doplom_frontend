import {message, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {AdminTableColumns, UserTableColumns} from "./TableColumns.jsx";
import MessageEmptyTable from "../MessageEmptyTable/MessageEmptyTable.jsx";

const {contextHolder} = message.useMessage;

function TableReportsAll() {
  const [dataTableMain, setDataTableMain] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/requests/get_processing", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setDataTableMain(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (dataTableMain.length === 0) {
    return <MessageEmptyTable/>;
  } else {
    const isAdmin = localStorage.getItem("user") === "admin";

    return (
      <div style={{ margin: 10 }}>
        {contextHolder}
        <Table
          dataSource={dataTableMain}
          columns={isAdmin ? AdminTableColumns : UserTableColumns}
          bordered
          size="middle"
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}

export default TableReportsAll;
