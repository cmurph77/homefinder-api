import './index.scss'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import {  useDispatch  } from 'react-redux'
import { fetchLogin, setRemember } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/')
                message.success('------------Login---------');
            }
        });
        return () => unsubscribe()
    },[])
    
    const onFinish = async (values) => {
        console.log(values)
        const resultAction = await dispatch(fetchLogin(values))
        if (fetchLogin.fulfilled.match(resultAction)) {
            console.log("Login successful");
            await navigate('/');
            await message.success('------------Login---------');
        } else if (fetchLogin.rejected.match(resultAction)) {
            console.error("Login failed:", resultAction.payload);
            await message.error("Login failed: " + resultAction.payload);
        }
    }

    const onChange = (e) =>{
        dispatch(setRemember(e.target.checked))
    }

    const formItemsLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                <Form onFinish={onFinish} validateTrigger="onBlur">

                    <Form.Item
                        className='login-username'
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            },
                            {
                                type: 'email',
                                message: 'The input is not a valid E-mail!',
                            }
                        ]}
                        {...formItemsLayout}
                    >
                        <Input size='large' placeholder='enter email'></Input>
                    </Form.Item>

                    <Form.Item
                        className='login-password'
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                        {...formItemsLayout}
                    >
                        <Input.Password size='large' placeholder='enter password'/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{offset:2 }}
                    >
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                        <a className="login-forgot" href="http://localhost:3000/login" style={{textDecoration:'none'}}>
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item  className='login-btn-container' >
                        <Button type='primary' htmlType='submit' size='large'>
                            Login
                        </Button>
                        <Button size='large' href="/signup">
                            Sign up
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default Login