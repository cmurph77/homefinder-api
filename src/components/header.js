import React, { useMemo } from "react";
import { PrimaryButton } from "@fluentui/react";
import { Dropdown } from 'flowbite-react';
import logo from '@/images/logo.png';
import './header.css';

export default function Header() {
        
    const username = "username"; // Will be an imported prop later ToDo
    const isLoggedIn = true; //Will update later when login is implemented ToDo
    const hasNewChat = true; //ToDo add logic

    //Logged out users do not see the chat button on the header bar
    //Logged in users can and will be able to see if they have unread chat notifications
    const chatButton =useMemo(() => {
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
    const profileButton =useMemo(() => {
        if (isLoggedIn) {
            return(
                <Dropdown className={"ProfileButton"} label={username} dismissOnClick={false}>
                    <Dropdown.Item onClick={() => alert('Settings')}> Settings</Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Liked')}> Liked Properties </Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Sign Out')}> Sign out </Dropdown.Item>
                </Dropdown>
            );
        }
        else {
            return(
                <PrimaryButton
                    className={"SignInButton"}
                    onClick={() => null} //ToDo add functionality
                >
                    Sign In
                </PrimaryButton>
            );
        }
    }, [isLoggedIn]);

    return (
        <section className="Header">
            <img src={logo} className="HF-Logo" alt="logo" />
            <div className={"ChatContainer"}>{chatButton}</div>
            <div className={"ProfileContainer"}>{profileButton}</div>
        </section>
    );
}
