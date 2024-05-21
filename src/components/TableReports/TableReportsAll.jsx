import {Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {UserTableColumns} from "./TableColumns.jsx";
import {useNavigate} from "react-router-dom";
import MessageEmptyTable from "../MessageEmptyTable/MessageEmptyTable.jsx";

function TableReportsAll() {
  const [dataTableMain, setDataTableMain] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/requests/get_all", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setDataTableMain(response.data);
      })
      .catch(error => {
        if(error.response.status === 401 && error.response) {
            navigate("/")
        }
          });
  }, []);

  if (dataTableMain.length === 0) {
    return <MessageEmptyTable/>;
  } else {
    return (
      <div style={{ margin: 10 }}>
        <Table
          dataSource={dataTableMain}
          columns={UserTableColumns}
          bordered
          size="middle"
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}

export default TableReportsAll;
