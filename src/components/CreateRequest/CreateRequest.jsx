import { Checkbox, InputNumber, Button, Row, Col, message } from "antd";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function CreateRequest() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/products/get_all", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(response => {
            setProducts(response.data);
        }).catch(error => {
            if(error.response.status === 401 && error.response) {
                  navigate("/")
              }
        });
    }, []);

    const handleProductSelection = useCallback((productId, count) => {
        setSelectedProducts(prevSelected => {
            const index = prevSelected.findIndex(item => item.product_id === productId);
            if (index !== -1) {
                const updatedSelected = [...prevSelected];
                updatedSelected[index].count = count;
                return updatedSelected;
            } else {
                return [...prevSelected, { product_id: productId, count }];
            }
        });
    }, []);

    const handleRequestSubmit = useCallback(() => {
        const requestData = {
            list_products: selectedProducts
        };

        axios.post('http://localhost:8000/requests/create_request/?status=%D0%92%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%B5', requestData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            message.success("Заявка успешно отправлена!");
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [selectedProducts]);

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={[16, 16]} justify="center">
                {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <ProductRows product={product} onSelect={handleProductSelection} />
                    </Col>
                ))}
            </Row>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Button type="primary" size="large" onClick={handleRequestSubmit}>Отправить заявку</Button>
            </div>
        </div>
    );
}

function ProductRows({ product, onSelect }) {
    const [isChecked, setIsChecked] = useState(false);
    const [count, setCount] = useState(1);

    const handleCheckboxChange = useCallback((e) => {
        setIsChecked(e.target.checked);
        onSelect(product.id, count);
    }, [onSelect, product.id, count]);

    const handleCountChange = useCallback((value) => {
        setCount(value);
        onSelect(product.id, value);
    }, [onSelect, product.id]);

    return (
        <div style={{ backgroundColor: '#f0f2f5', padding: 10, borderRadius: 8 }}>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange}>{product.name}</Checkbox>
            <InputNumber
                min={1}
                disabled={!isChecked}
                value={count}
                onChange={handleCountChange}
            />
        </div>
    );
}

ProductRows.propTypes = {
    product: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default CreateRequest;
