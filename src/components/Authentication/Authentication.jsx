import {Button, Input, Space, message} from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@fontsource/judson'




function Authentication() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleAuth = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login', {
                username: username,
                password: password
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            messageApi.open({
                type: 'success',
                title: 'LoginPage successfully',
                content: 'Вы авторизованы'
            })

            localStorage['access_token'] = response.data.access_token;
            localStorage['user'] = response.data.username;
            navigate(`/${response.data.username}`);
            // Обработка успешной авторизации
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            messageApi.open({
                type: 'error',
                content: "Ошибка авторизации " + error.message
            })
            // Обработка ошибки авторизации
        }
    };

    return (
        <>
            <b style={{
                marginBottom: 20,
                fontSize: 70,
                fontFamily: "sans-serif",
                color: "white"
            }}>Авторизация</b>
            {contextHolder}
            <Space direction="vertical">
                <Input
                    size="large"
                    id="username"
                    placeholder="Имя пользователя"
                    prefix={<UserOutlined/>}
                    style={{borderRadius: "59px"}}
                />
                <Input.Password
                    size={"large"}
                    id="password"
                    placeholder="Пароль"
                    prefix={<LockOutlined/>}
                    style={{borderRadius: "59px"}}

                />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <div align="center">
                    <Button size={"large"} type="primary" onClick={handleAuth} style={{
                        borderRadius: '53px',
                        width: "50%"
                    }}>
                        Войти</Button>
                </div>

            </Space>
        </>
    );
}

export default Authentication;