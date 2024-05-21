import {message, Button, Table} from "antd";
import axios from "axios";

export const ProductsTableColumns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
    },
  ];

function handleButtonClick(id) {
    const url = `http://localhost:8000/requests/perform_request?request_id=${id}`;
    axios.post(url, null, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
    })
        .then(() => {
            message.success("Заявка принята");
            window.location.reload()
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    })
}

export const AdminTableColumns = [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Продукты",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <Table
          dataSource={products}
          columns={ProductsTableColumns}
          pagination={false} // Отключаем пагинацию для вложенной таблицы
        />
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
        render: (text, record) => (
            <Button size="large" onClick={() => handleButtonClick(record.id)}>Отправить</Button>
        )
    }
  ];

export const UserTableColumns = [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Продукты",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <Table
          dataSource={products}
          columns={ProductsTableColumns}
          pagination={false} // Отключаем пагинацию для вложенной таблицы
        />
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
  ];