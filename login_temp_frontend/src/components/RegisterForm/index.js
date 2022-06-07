import {Form, Input, Button, Checkbox, Card, Image, Typography} from 'antd';
import styles from './index.module.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { register, reset} from "../../features/authSlice";
import Spinner from "../Spinner";
const { Title } = Typography;


const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/login')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading){
        return <Spinner />
    }

    const onHandleFormSubmit = () => {
        // e.preventDefault()

        if (password !== confirmPassword){
            toast.error('Password do not match')
        }else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }

    }
    const onClickLogin = () => {
        navigate('/login')
    }

    return(
        <div className={styles.register_container}>
            <Card
                hoverable
                style={{ width: "45vh", height: "70vh" }}
                className={styles.register_card}
            >
                <Form
                    className={styles.register_form}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onHandleFormSubmit}
                    autoComplete="off"
                >

                    <div style={{ display:"flex", flexDirection:"column", alignItems: "center", justifyContent: "center"}}>
                        <Image style={{ borderRadius: "2px"}}
                               width={60}
                               preview={false}
                               src="temp.png"
                        />
                        <Title level={3} style={{ color: "black"}}>Register</Title>
                    </div>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ]}
                    >
                        <Input
                            placeholder="name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </Form.Item>
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

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                    </Form.Item>

                    <Form.Item
                    >
                        <Button
                            htmlType="submit"
                            className={styles.register_button}
                            style={{backgroundColor:"black", color:"white"}}
                        >
                            Submit
                        </Button>
                    </Form.Item>

                    <div className={styles.register_row}>
                        <h3>Already a user ?  <span><a onClick={onClickLogin} >Login</a></span></h3>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default RegisterForm