import axios from "axios";
import {useNavigate} from "react-router-dom";

export function GetAllNamesProducts(setter) {
     axios.get("http://localhost:8000/products/get_all", {
            headers:{
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
        })
        .then(response => {
            // Используем метод map для извлечения только наименований продуктов
            const productNames = response.data.map(product => product.name);
            // Обновляем состояние allProducts с полученными наименованиями продуктов
            setter(productNames);
        })
        .catch(error => {
            console.error("Ошибка при получении списка продуктов:", error);
        });
}

export function GetAllProducts(setter) {
    axios.get("http://localhost:8000/products/get_all", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
    })
        .then(response => {
            setter(response.data);
        })
        .catch(error => {
            console.error("Ошибка при получении списка продуктов:", error);
        });
}
