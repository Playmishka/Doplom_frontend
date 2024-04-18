import axios from "axios";
import {columns} from "./TableColumns.js";
import {Table} from "antd";
import {useEffect, useState} from "react";

export default function TableProducts(props) {
    const [dataTable, setDataTable] = useState([])

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
    }, [props.storehouse]) // add dependency array here

    return (
        <>
            <Table dataSource={dataTable} columns={columns}/>
        </>
    )
};