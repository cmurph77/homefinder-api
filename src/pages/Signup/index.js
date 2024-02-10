import './index.scss'
import { Card, Form, Input, Button, Checkbox, Select,message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const { Option } = Select;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        await dispatch(fetchLogin(values))
        navigate('/')
        message.success('------------Login---------')
    }

    const formItemsLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return (
        <div className='signup'>
            <Card className='signup-container'>
                <img className='signup-logo' src={logo} alt=''/>
                <Form 
                    onFinish={onFinish} 
                    validateTrigger="onBlur"
                >
                    {/* Email Input Item */}
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                        {...formItemsLayout}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='signup-item'
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
                        className='signup-item'
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                        hasFeedback
                        {...formItemsLayout}
                    >
                        <Input.Password size='large' placeholder='enter password'/>
                    </Form.Item>

                    <Form.Item
                        className='signup-item'
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match'))
                                }
                            })
                        ]}
                        hasFeedback
                        {...formItemsLayout}
                    >
                        <Input.Password size='large' placeholder='confirm password'/>
                    </Form.Item>

                    <Form.Item
                        className='signup-item'
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                        {...formItemsLayout}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        wrapperCol={{span:16,offset:8 }}
                    >
                        <Checkbox>
                            I have read the <a href="">Privacy Agreement</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item  className='signup-btn-container' >
                        <Button size='large' href="/login">
                            Login
                        </Button>
                        <Button type='primary' htmlType='submit' size='large'>
                            Sign up
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default Signup