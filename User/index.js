import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Menu } from 'antd';
import {
    HeartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import _Header from "@/components/header.js";

import './index.scss'

import { Layout  } from 'antd';
const { Header, Content } = Layout;

// items for the sider menu
const items = [
    {
        label: 'Profile',
        key: '/user/profile',
        icon: <UserOutlined />,
    },
    {
        label: 'Liked Properties',
        key: '/user/liked-properties',
        icon: <HeartOutlined />,
    },
];


const App = () => {

    const navigate = useNavigate()
    // select the tab based on the current path
    const location = useLocation()
    console.log(location.pathname)
    const selectedkey = location.pathname

    // handle the menu selection, navigate to the selected path
    const onSelect = (item) => {
        const path = item.key
        navigate(path)
    }
    const temp = {
        firebase_id : '0',
        name : "dummy",
        profile_pic : "null",
        selected_tags:{
            languages : [],
            smoker : [],
            pets : [],
            diet : [],
            allergies : [],
            habit : [],
            work : [],
        },
        phone_number : "12345678",
        bio : "Hi, I'm not a real person!",
        liked_properties : [],
        liked_users : [],
    }

    return (
        <div className="user-container">
            <Layout className="user-layout">
                <Header className="user-header">
                    <_Header/>
                </Header>
                <Content className="user-content">
                    <Menu
                        style={{
                            width: 200,
                        }}
                        defaultSelectedKeys={['/user/profile']}
                        selectedKeys={selectedkey}
                        theme={'light'}
                        items={items}
                        onSelect={onSelect}
                        className="user-menu"
                    />
                    <Outlet temp={temp} />
                </Content>
            </Layout>
        </div>
    )
}

export default App