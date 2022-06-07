import {Form, Input, Button, Checkbox, Card, Image, Typography} from 'antd';
import styles from './index.module.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login, reset} from "../../features/authSlice";
import {saveWeather} from "../../features/weatherSlice";
import Spinner from "../Spinner";
const { Title } = Typography;


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message, logged } = useSelector((state) => state.auth);

    useEffect(() => {
        if(logged){
            console.log('user logged !')
            dispatch(saveWeather(0));
            dispatch(saveWeather(1));
        }
    },[logged]);

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);


    if (isLoading){
        return <Spinner />
    };


    const onClickRegister = () => {
        navigate('/register')
    };

    const onFinish = (values) => {
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className={styles.login_container}>
            <Card
                hoverable
                style={{ width: "45vh", height: "60vh" }}
                className={styles.login_card}
            >
                <Form
                    className={styles.login_form}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <div style={{ display:"flex", flexDirection:"column", alignItems: "center", justifyContent: "center"}}>
                        <Image style={{ borderRadius: "2px"}}
                               width={60}
                               preview={false}
                               src="temp.png"
                        />
                        <Title level={3} style={{ color: "black"}}>Login</Title>
                    </div>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Username"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </Form.Item>

                    <div className={styles.register_row}>
                        <div>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </div>
                        <div className={styles.register_button}>
                            <h4><a  className={{}} onClick={onClickRegister}>Register</a></h4>
                        </div>
                    </div>

                    <Form.Item
                    >
                        <Button
                            htmlType="submit"
                            className={styles.login_button}
                            style={{backgroundColor:"black", color:"white"}}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginForm