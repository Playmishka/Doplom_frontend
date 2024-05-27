import {Button, Divider, Input, InputNumber, List, message, Select} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState()
    const [allNamesProduct, setAllNamesProduct] = useState([])

    const [allProducts, setAllProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [isDisable, setIsDisable] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState();
    const [count, setCount] = useState();

    function handlerAddProduct() {
        if (!productName) {
            message.error("Введите наименование продукта");
            return;
        }

        axios.get(`http://localhost:8000/products/add_new?product_name=${productName}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then(() => {
            message.success("Новый товар добавлен!");
            GetAllNamesProducts(setAllNamesProduct)
            // Очищаем поле ввода после успешного добавления товара
            setProductName("");
        })
        .catch(error => {
            console.error("Ошибка при добавлении товара:", error);
            message.error("Произошла ошибка при добавлении товара");
            if(error.response.status === 401 && error.response) {
                  navigate("/")
              }
        });
    }

    useEffect(() => {
        GetAllProducts(setAllProducts)
    }, [allNamesProduct]);

    useEffect(() => {
        if (allProducts) {
            const transformedOptions = allProducts.map(item => ({
                value: item.id.toString(),
                label: item.name
            }));
            transformedOptions.push({ value: 'disabled', label: 'Disabled', disabled: true });
            setOptions(transformedOptions);
        }
    }, [allProducts]);

    async function ReceiptProduct() {
        // Очистка предыдущих сообщений
        message.destroy();

        try {
            if (!selectedProduct) {
                throw new Error("Продукт не выбран!");
            }

            if (count <= 0) {
                throw new Error("Введите корректное количество товара.");
            }

            const response = await axios.get(
                'http://127.0.0.1:8000/add_products/main_storehouse',
                {
                    params: {
                        product_id: selectedProduct,
                        count: count
                    },
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    }
                }
            );

            if (response.status === 200) {
                message.success("Поставка принята!");
            } else {
                throw new Error("Ошибка при отправке запроса: " + response.status);
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            message.error("Произошла ошибка при отправке запроса!");
        }
    }

    useEffect(() => {
        GetAllNamesProducts(setAllNamesProduct);
    }, []);


    function GetAllNamesProducts(setter) {
        axios.get("http://localhost:8000/products/get_all", {
            headers: {
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
                if (error.response.status === 401 && error.response) {
                    navigate("/")
                }
            });
    }

    function GetAllProducts(setter) {
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
                if(error.response.status === 401 && error.response) {
                      navigate("/")
                  }
            });
    }

    return (
        <>
            <div style={{ padding: "10px", display: "flex" }}>
                <div>
                    <List header={<b>Продукты</b>} bordered dataSource={allNamesProduct}
                          renderItem={(item) => <List.Item style={{fontSize: 20}}>{item}</List.Item>}
                    style={{overflowX: "auto", height: "93vh"}}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50%", height: "50%",
                    border: "1px solid grey", borderRadius: 20, padding: 40}}>
                        <Divider>Новый продукт</Divider>
                        <Input size={"large"} placeholder="Наименование продукта" value={productName}
                           onChange={(e) => setProductName(e.target.value)} style={{width: "75%", margin: 10}}/>
                        <Button size={"large"} onClick={handlerAddProduct}>Добавить товар</Button>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "50%", justifyContent: "center",
                        height: "50%", border: "1px solid grey", borderRadius: 20, padding: 40, marginTop: 10}}>
                        <Divider>Поставка</Divider>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <Select
                                options={options}
                                size="large"
                                style={{width: 200, marginRight: 10}}
                                onChange={(value) => {
                                    setIsDisable(false);
                                    setSelectedProduct(value);
                                }}
                            />
                            <InputNumber
                                disabled={isDisable}
                                min={0}
                                max={9999}
                                size="large"
                                onChange={(value) => setCount(value)}
                            />
                        </div>
                        <div style={{margin: 20}}>
                            <Button onClick={ReceiptProduct} size="large">Поставить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}


export default AddProduct;