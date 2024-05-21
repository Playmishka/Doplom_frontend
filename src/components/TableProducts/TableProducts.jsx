import axios from "axios";
import {columns} from "./TableColumns.js";
import {Table} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TableProducts(props) {
    const [dataTable, setDataTable] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
      axios.get(
        // eslint-disable-next-line react/prop-types
        `http://localhost:8000/storehouse/${props.storehouse}`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      ).then(r => setDataTable(r.data))
          .catch(error => {
              if(error.response.status === 401 && error.response) {
                  navigate("/")
              }
          })
    }, [props.storehouse]) // add dependency array here

    return (
        <>
            <Table dataSource={dataTable} columns={columns} style={{margin: 10}}/>
        </>
    )
};