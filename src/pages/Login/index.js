import './index.scss'
import { Card, Form, Input, Button, Checkbox,message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
// import { Navigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        // console.log('Success:', values);
        // Trigger asynchronous action fetchLogin()
        await dispatch(fetchLogin(values))
        navigate('/')
        message.success('------------Login---------')
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
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your usename!"
                            },
                            // {
                            //     pattern: `/^[a-zA-Z0-9_-!?]+$/`,
                            //     message: "Please only enter alphabet, numbers and -_!?"
                            // }
                        ]}
                        {...formItemsLayout}
                    >
                        <Input size='large' placeholder='enter username'></Input>
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
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-forgot" href="">
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