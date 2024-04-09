import React, { useEffect, useMemo, useState } from "react";
import { clearUId, clearUId_Session } from "@/utils";
import { useSelector } from 'react-redux';
import logo from '@/images/logo.png';
import './header.css';
import { useNavigate } from "react-router-dom"
import {  message, Popconfirm } from 'antd'
import { LogoutOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { axios_instance } from "@/utils";

export default function Header( props ) {

    const uid = useSelector(state => state.user.userId)

    const [userName, setUserName] = useState(null)
    // Logout Function
    const navigate = useNavigate()
    const signout = () => {
        signOut(auth).then(() => {
            navigate('/login')
            clearUId()
            clearUId_Session()
        }).catch((error) => {
            message.success("Logout Failed, please try again later")
        });
    }

    useEffect(()=>{
        if (uid) {
            axios_instance.get(`/get-user-info/${uid}`).then((res) => {
                setUserName(res.data.name)
            }).catch((error) => {
                console.log(error)
            })
        }
    },[])

    const UserButton = () => {
        return (
            <div className="header-user-btn">
                <span 
                    className="user-name" 
                    style={{ marginRight: '20px', cursor: 'pointer'}}
                    onClick={() => navigate('/user')}
                >
                    <UserOutlined 
                        style={{ marginRight: '10px'}}
                    />
                    {userName}
                </span>
                <span className="user-logout"  style={{ marginRight: '20px',cursor: 'pointer'}}>
                    <Popconfirm 
                        title="Sign Out？" 
                        okText="Sign Out" 
                        cancelText="Cancel" 
                        onConfirm={signout}
                    >
                        <LogoutOutlined style={{ marginRight: '10px'}}/>Sign Out
                    </Popconfirm>
                </span>
            </div>
        )
    }

    const handleNavigate = (path) => {
        if (props.property) {
            if(props.property === 'user page') {
                navigate(-1)
            }
            else {
                navigate('/')
            }
        }
    }

    const BackButton = () => {
        return (
            <div className="header-back-btn" onClick={handleNavigate}>
                <LeftOutlined style={{marginRight: '5px'}}/>Back
            </div>
        )
    }

    return (
        <section className="Header">
            <img src={logo} className="HF-Logo" alt="logo" onClick={()=>{navigate('/')}} />
            <UserButton style={{
                marginRight: '20px',
            }}/>
            { props.property ? <BackButton /> : null}
        </section>
    );
}
