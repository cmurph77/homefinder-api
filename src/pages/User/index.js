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

    // make api calls to get user info, when user id changes or profile is updated
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log("Fetching user info", profileUpdated);
                setLoading(true);
                // const res = await axios_instance.get('/get-user-info', {
                //     params: { user_id: userId }
                // });
                const res = {
                    status: 200,
                    data: {
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
                }
                if (res.status === 200) {
                    setUserInfo(res.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                // setProfileUpdated(false)
            }
        };
        fetchUserInfo();
    }, [userId, profileUpdated]);

    const renderContent = () => {
        switch (selectedkey) {
            case 'profile':
                return <UserProfile data={userInfo} toggleProfileUpdated={toggleProfileUpdated} />;
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
                    <_Header/>
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