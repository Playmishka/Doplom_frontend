import {
    ApiOutlined,
    AppstoreAddOutlined,
    CopyOutlined,
    NodeExpandOutlined,
    ShopOutlined,
    SnippetsOutlined,
} from "@ant-design/icons";
import { Segmented } from "antd";
import "./index.css"; // Подключаем стили из index.css
import TableProducts from "../TableProducts/TableProducts.jsx";
import TableReportsAll from "../TableReports/TableReportsAll.jsx";
import TableReportsProcess from "../TableReports/TableReportsProcess.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRequest from "../CreateRequest/CreateRequest.jsx";
import AddProduct from "../AddProduct/AddProduct.jsx";
import SpentItems from "../SpentItems/SpentItems.jsx";

function UserMenuSegments() {
    const navigate = useNavigate();

    const options = [
        {
            value: "storehouse",
            label: "Склад",
            icon: <ShopOutlined />,
            component: <TableProducts storehouse={localStorage.getItem("storehouse")} />
        },
        {
            value: "allRequests",
            label: "Все заявки",
            icon: <CopyOutlined />,
            component: <TableReportsAll />
        },
        {
            value: "processRequests",
            label: "Заявки в ожидании",
            icon: <SnippetsOutlined />,
            component: <TableReportsProcess />
        },
    ];

    if (localStorage.getItem("user") === "admin") {
        options.push({
            value: "addProduct",
            label: "Добавить товар",
            icon: <ShopOutlined />,
            component: <AddProduct/>
        })
    } else {
        options.push(
            {
                value: "addRequest",
                label: "Создать заявку",
                icon: <AppstoreAddOutlined />,
                component: <CreateRequest />
            },
            {
                value: "spend_items",
                label: "Потраченные товары",
                icon: <NodeExpandOutlined />,
                component: <SpentItems/>
            }
        );
    }

    options.push(
        {
            value: "exit",
            label: "Выход",
            icon: <ApiOutlined />,
        }
    );

    const [selectedSegment, setSelectedSegment] = useState('storehouse');

    const handleSegmentChanged = (value) => {
        if (value === "exit") {
            navigate("/");
        }
        setSelectedSegment(value);
    };

    return (
        <>
            <div>
                <Segmented options={options} value={selectedSegment} onChange={handleSegmentChanged} block size={"large"}
            />
            <div className="segment-content"> {/* Обертка для стилей */}
                {options.find((options) => options.value === selectedSegment)?.component}
            </div>
            </div>
        </>
    );
}

export default UserMenuSegments;
