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
                    <Outlet />
                </Content>
            </Layout>
        </div>
    )
}

export default App