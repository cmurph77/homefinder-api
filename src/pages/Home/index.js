import React, { useMemo } from "react";
import { useState } from 'react';
import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import empty_listings from "@/server/empty-property-object.json";
import Header from "@/components/header.js";
import ListingGrid from "@/components/listingGrid.js";
import { list } from 'postcss';

// const old_listings = listingData.properties
// console.log("Frontend Property Data - oldlistings ")
// console.log(old_listings)

// Make the API call --------------------------------------

var listings
await fetch('http://127.0.0.1:8000/dummydata-properties')
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
        listings = empty_listings.properties
      throw new Error('Failed to retrieve data');
    }
    // If successful, parse the JSON data
    return response.json();
  })
  .then(api_data => {
    // Now you can work with the JSON data
    listings = api_data.properties

  })
  .catch(error => {
    console.error('Error:', error);
    listings = empty_listings.properties

  });


console.log("listings recieved from the backend")
console.log(listings)


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