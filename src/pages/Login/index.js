import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

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

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                <Form onFinish={onFinish} validateTrigger="onBlur">

                    <Form.Item
                        name="username"
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
                        >
                        <Input size='large' placeholder='enter username'></Input>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                        >
                        <Input.Password size='large' placeholder='enter password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block>
                            Login
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default Login