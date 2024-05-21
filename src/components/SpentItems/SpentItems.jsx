import axios from "axios";
import {useEffect, useState} from "react";
import {Button, InputNumber, Select, message} from "antd";
import {useNavigate} from "react-router-dom";

function SpentItems() {
    const navigate = useNavigate()

    const [productsFromStorehouse, setProductsFromStorehouse] = useState([])
    const [options, setOptions] = useState()
    const [isDisable, setIsDisable] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState()
    const [maxCountSelectedProduct, setMaxCountSelectedProduct] = useState(0)
    const [countSelectedProduct, setCountSelectedProduct] = useState(0)

    useEffect(() => {
        getAllProductsFromStorehouse(setProductsFromStorehouse);
    }, []);

    useEffect(() => {
        if(productsFromStorehouse){
            const transformOptions = productsFromStorehouse.map(item => ({
                value: item.id,
                label: item.name
            }))
            transformOptions.push({ value: 'disabled', label: 'Disabled', disabled: true });
            setOptions(transformOptions);
        }
    }, [productsFromStorehouse]);


    function getMaxCount() {
        if (selectedProduct) {
            setMaxCountSelectedProduct(productsFromStorehouse.find(item => item.id === selectedProduct.value).count);
        }
    }

    function SentProduct() {
        axios.put(`http://127.0.0.1:8000/products/spend_items/${selectedProduct.value}?count=${countSelectedProduct}`, null, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(() => {
                message.success(`Потрачен товар ${getNameFromIdProduct()} в количестве ${countSelectedProduct}`)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                <div style={{margin: 15}}>
                    <Select size={"large"} options={options} style={{width: 300, marginRight: 10}} onChange={SelectProduct}/>
                    <InputNumber min={1} disabled={isDisable} max={maxCountSelectedProduct} size="large"
                                 onChange={(value) => setCountSelectedProduct(value)}
                                 onSelect={getMaxCount}/>
                </div>

                <Button onClick={SentProduct} size="large">Потратить</Button>
            </div>
        </>
    )

    function SelectProduct(value) {
        setSelectedProduct({value});
        setIsDisable(false);
    }

    function getNameFromIdProduct() {
        return productsFromStorehouse.find(item => item.id === selectedProduct.value).name
    }

    function getAllProductsFromStorehouse(setter){
        axios.get(
            // eslint-disable-next-line react/prop-types
            "http://localhost:8000/storehouse/storehouse",
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        ).then(r => setter(r.data))
            .catch(error => {
                if (error.response.status === 401 && error.response) {
                    navigate("/")
                }
            })
    }
}

export default SpentItems;