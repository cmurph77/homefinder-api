import './index.scss'
import { Card, Form, Input, Button, Checkbox, Select, message } from 'antd'
import logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { axios_instance } from "@/utils";


const Signup = () => {
    const { Option } = Select;
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
        console.log(values)
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            const uid = user.uid
            axios_instance.post('/add-user-to-database/', {
                user_data: values,
                user_id: uid
            }).catch((error) => {
                console.log(error)
                message.error('------------Sign Up Failed---------')
            })
            navigate('/login')
            message.success('------------Sign Up success---------')
        })
        .catch((error) => {
            message.error(error.code)
        });
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
                                message: 'The input is not a valid E-mail!',
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
                            },
                            {
                                min: 6,
                                message: "Password must be at least 6 characters"
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
                        <Select placeholder="Select your gender">
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
                            I have read the <a href="http://localhost:3000/signup" style={{textDecoration:'none'}}>Privacy Agreement</a>
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