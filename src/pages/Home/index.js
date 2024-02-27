import React, { useMemo } from "react";
import { useState } from 'react';
import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import listingData from "@/server/daftData.json";
import Header from "@/components/header.js";
import ListingGrid from "@/components/listingGrid.js";
import ListingMap from "../../components/listingMap";
import './index.scss';

const listings = listingData.properties;
const Home = () => {
    const navigate = useNavigate()
    const signout = () => {
        signOut(auth).then(() => {
            navigate('/login')
            message.success("Logout successed")
        }).catch((error) => {
            message.success("Logout Failed, please try again later")
        });
    }

    const [mapView, setView] = useState(false);

    const handleToggle = () => {
        setView((current) => !current);
    };

    const ListingType = useMemo(() => {
        if (mapView) {
            return(<ListingMap properties={listings}/>);
        }
        else {
            return(<ListingGrid properties={listings}/>);
        }
    }, [mapView]);

    return (
        <div>This is the homepage
            <Button type="primary" onClick={() => signout()}>
                Logout!
            </Button>
            <Header />
            <Button classname = "viewButton" onClick={handleToggle}>Change View</Button>
            {ListingType}
        </div>
        
        
    )
}

export default Home