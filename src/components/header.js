import React, { useEffect, useMemo, useState } from "react";
import { PrimaryButton } from "@fluentui/react";
import logo from '@/images/logo.png';
import './header.css';
import { useNavigate } from "react-router-dom"

import {  message, Popconfirm } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { axios_instance } from "@/utils";

export default function Header() {
    const [userName, setUserName] = useState(null)

    // Logout Function
    const navigate = useNavigate()
    const signout = () => {
        signOut(auth).then(() => {
            navigate('/login')
            message.success("Logout successful")
        }).catch((error) => {
            message.success("Logout Failed, please try again later")
        });
    }
    
    const isLoggedIn = true; //Will update later when login is implemented ToDo
    const hasNewChat = true; //ToDo add logic

    const user = auth.currentUser;
    // const uid = user.uid
    const uid =  "ykaiawrX"
    useEffect(() => {
        axios_instance.get(`/get-user-info/${uid}`).then((res) => {
            console.log(res.data)
            setUserName(res.data.name)
        }).catch((error) => {
            console.log(error)
        })
    },[])

    //Logged out users do not see the chat button on the header bar
    //Logged in users can and will be able to see if they have unread chat notifications
    const chatButton = useMemo(() => {
        if (isLoggedIn && hasNewChat) {
            return(
                <PrimaryButton
                    className={"ChatButton"}
                    onClick={() => null} //ToDo add functionality
                >
                    Chat (New)
                </PrimaryButton>
            );
        }
        else if(isLoggedIn) {
            return(
                <PrimaryButton
                    className={"ChatButton"}
                    onClick={() => null} //ToDo add functionality
                >
                    Chat
                </PrimaryButton>
            );
        }
        else {
            return(null);
        }
    }, [isLoggedIn, hasNewChat]);

    const UserButton = () => {
        return (
            <div className="user-info">
                <span 
                    className="user-name" 
                    style={{ marginRight: '20px', cursor: 'pointer'}}
                    onClick={() => navigate('/user')}
                >
                    <UserOutlined 
                        style={{ marginRight: '5px'}}
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
                        <LogoutOutlined /> Sign Out
                    </Popconfirm>
                </span>
            </div>
        )
    }

    return (
        <section className="Header">
            <img src={logo} className="HF-Logo" alt="logo" onClick={()=>{navigate('/')}} />
            <div className={"ChatContainer"}>{chatButton}</div>
            <UserButton style={{
                marginRight: '20px',
            }}/>
        </section>
    );
}
