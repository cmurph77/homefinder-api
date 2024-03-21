import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Divider, Menu, Switch } from 'antd';
import {
    HeartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { axios_instance } from '@/utils'
import { useEffect, useState } from "react"
import _Header from "@/components/header.js";
// import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import UserProfile from "./components/UserProfile";
import LikedProperties from "./components/LikedProperties";

import './index.scss'

import { Layout  } from 'antd';
const { Header, Content } = Layout;


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

    const location = useLocation()
    console.log(location.pathname)
    const selectedkey = location.pathname


    const onSelect = (item) => {
        console.log('菜单被点击了', item.key)
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