import React, { useMemo } from "react";
import { PrimaryButton } from "@fluentui/react";
import { Dropdown } from 'flowbite-react';
import logo from '@/images/logo.png';
import './header.css';
import { useNavigate } from "react-router-dom"

import {  message, Popconfirm } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default function Header() {

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
    
    const username = "username"; // Will be an imported prop later ToDo
    const isLoggedIn = true; //Will update later when login is implemented ToDo
    const hasNewChat = true; //ToDo add logic

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

    //ToDo change click handlers to move between links
    // const profileButton = useMemo(() => {
    //     if (isLoggedIn) {
    //         return(
    //             <Dropdown className={"ProfileButton"} label={username} dismissOnClick={false}>
    //                 <Dropdown.Item onClick={() => alert('Settings')}> Settings</Dropdown.Item>
    //                 <Dropdown.Item onClick={() => alert('Liked')}> Liked Properties </Dropdown.Item>
    //                 <Dropdown.Item onClick={() => signout()}> Sign out </Dropdown.Item>
    //             </Dropdown>
    //         );
    //     }
    //     else {
    //         return(
    //             <PrimaryButton
    //                 className={"SignInButton"}
    //                 onClick={() => null} //ToDo add functionality
    //             >
    //                 Sign In
    //             </PrimaryButton>
    //         );
    //     }
    // }, [isLoggedIn]);

    const UserButton = () => {
        const userName = 'User Name Here'
        return (
            <div className="user-info">
                <span 
                    className="user-name" 
                    style={{ marginRight: '20px', cursor: 'pointer'}}
                    onClick={() => navigate('/user')}
                >
                    <UserOutlined />
                    {userName}
                </span>
                <span className="user-logout"  style={{ cursor: 'pointer'}}>
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
            <UserButton/>
        </section>
    );
}
