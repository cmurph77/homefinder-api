import { useEffect, useState } from 'react'
import { Menu, Skeleton, Layout } from 'antd';
import { useSelector } from 'react-redux';

import {
    HeartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import _Header from "@/components/header.js";
import { axios_instance } from '@/utils';

import './index.scss'
import UserProfile from './components/UserProfile';
import LikedProperties from './components/LikedProperties';

const { Header, Content } = Layout;


// items for the sider menu
const items = [
    {
        label: 'Profile',
        key: 'profile',
        icon: <UserOutlined />,
    },
    {
        label: 'Liked Properties',
        key: 'liked-properties',
        icon: <HeartOutlined />,
    },
];


const App = () => {

    // selected key(tab) for the menu
    const [selectedkey, setSelectedKey] = useState('profile')
    // get user id from the store
    const userId = useSelector( store => store.user.userId )
    // user info
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)
    // trigger the fetchUserInfo function when user updates the profile
    const [profileUpdated, setProfileUpdated] = useState(false)
    const toggleProfileUpdated = () => setProfileUpdated(!profileUpdated)

    // handle the menu selection, navigate to the selected path
    const onSelect = (item) => {
        setSelectedKey(item.key)
    }

    const handleProfileUpdate = (data) => 
    {
        const updateUserInfo = async () => {
            try {
                setLoading(true);
                const res = await axios_instance.post('/update-users-info/', data, 
                    { headers: { 'Content-Type': 'application/json'}}
                )
                console.log(res);
                if (res.status === 200) {
                    setUserInfo(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        updateUserInfo();
        console.log("Profile Updated");
    };

    // make api calls to get user info, when user id changes or profile is updated
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log("Fetching user info", profileUpdated);
                setLoading(true);
                //If you want to easily test if user works, swap which following line is used
                //const res = await axios_instance.get(`/get-user-info/${userId}`); 
                const res = await axios_instance.get(`/get-user-info/YSixicUz`);
                console.log(res);
                if (res.status === 200) {
                    setUserInfo(res.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setProfileUpdated(false);
            }
        };
        fetchUserInfo();
    }, [userId, profileUpdated]);

    const renderContent = () => {
        switch (selectedkey) {
            case 'profile':
                return <UserProfile data={userInfo} handleProfileUpdate={handleProfileUpdate} />;
            case 'liked-properties':
                return <LikedProperties data={userInfo} toggleProfileUpdated={toggleProfileUpdated} />;
            default:
                return null;
        }
    };

    return (
        <div className="user-container">
            <Layout className="user-layout">
                <Header className="user-header">
                    <_Header property={'user page'}/>
                </Header>
                <Content className="user-content">
                    <Menu
                        style={{
                            width: 200,
                        }}
                        selectedKeys={selectedkey}
                        theme={'light'}
                        items={items}
                        onSelect={onSelect}
                        className="user-menu"
                    />
                    { loading ? <Skeleton /> : renderContent()}
                </Content>
            </Layout>
        </div>
    )
}

export default App