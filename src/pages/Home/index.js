import React, { useEffect, useMemo, useState } from "react";
import { Button, message, Pagination, Layout, FloatButton   } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

import empty_listings from "@/server/empty-property-object.json";

import _Header from "@/components/header.js";

import ListingGrid from "./components/listingGrid.js";
import ListingMap from "./components/listingMap.js";

import Filter from "./components/filter.js";

// import axios instance
import { axios_instance } from "@/utils/request";

import './index.scss'



// import { list } from 'postcss';

// const old_listings = listingData.properties
// console.log("Frontend Property Data - oldlistings ")
// console.log(old_listings)

// Make the API call --------------------------------------


// var listings
// await fetch('http://127.0.0.1:8000/dummydata-properties')
//   .then(response => {
//     // Check if the request was successful (status code 200)
//     if (!response.ok) {
//         // listings = empty_listings.properties
//         listings = [
//             {
//                 "identifier": "2222",
//                 "address": "No Properties Available ",
//                 "rent per month": 0,
//                 "daft.ie link": "  ",
//                 "latitude": 53.341833017884795,
//                 "longitude": -6.288615427057721,
//                 "property-type": {
//                     "category": "  ",
//                     "type": [
//                         "  ",
//                         "  ",
//                         "  "
//                     ],
//                     "bed": "  ",
//                     "bath": "  ",
//                     "m2": "N/A"
//                 }
//             }
//             ]
//       throw new Error('Failed to retrieve data');
//     }
//     // If successful, parse the JSON data
//     return response.json();
//   })
//   .then(api_data => {
//     // Now you can work with the JSON data
//     listings = [
//         {
//             "identifier": "2222",
//             "address": "No Properties Available ",
//             "rent per month": 0,
//             "daft.ie link": "  ",
//             "latitude": 53.341833017884795,
//             "longitude": -6.288615427057721,
//             "type-info": {
//                 "category": "  ",
//                 "type": [
//                     "  ",
//                     "  ",
//                     "  "
//                 ],
//                 "bed": "  ",
//                 "bath": "  ",
//                 "m2": "N/A"
//             }
//         }
//         ]
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     listings = [
//         {
//             "identifier": "2222",
//             "address": "No Properties Available ",
//             "rent per month": 0,
//             "daft.ie link": "  ",
//             "latitude": 53.341833017884795,
//             "longitude": -6.288615427057721,
//             "property-type": {
//                 "category": "  ",
//                 "type": [
//                     "  ",
//                     "  ",
//                     "  "
//                 ],
//                 "bed": "  ",
//                 "bath": "  ",
//                 "m2": "N/A"
//             }
//         }
//         ]
// });
// console.log("listings recieved from the backend")
// console.log(listings)

const { Header, Footer, Content } = Layout;
const Home = () => {
    const [listings, setListing ] = useState()

    // --------- Page Number ------
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    const onChange = (page, pageSize) => {
        console.log("change page.",page,pageSize )
        setPageNo(page)
        setPageSize(pageSize)
    }
    
    // Fetch Data based on page number and page size.
    useEffect(  ()=>{
        const fetchData = async () => {
            setLoading(true)
            const res = await axios_instance.get(`/get-propertys-by-pagenum-live/${pageNo}/${pageSize}`)
                .catch((error)=>{
                        setListing(empty_listings.properties)
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                    console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                     throw new Error('Failed to retrieve data');
                })
            await setListing(res)
            await setLoading(false)
            await console.log("fetch data success",res)
            // await ListingType
        }
        fetchData()
    },[pageNo, pageSize])
  
    //--------- Filter ------
    const handleFilter = (rentVal, BedVal, BathVal) => 
    {
        //Have to make API call here and update listings/setlistings with the response
        //Does not exist in backend currently
        console.log("Filtered");
    };

    const [mapView, setView] = useState(false);

    const handleToggle = () => {
        setView((current) => !current);
    };


    // const ListingType = useMemo(() => {
    //     if (mapView) {
    //         return(<ListingMap properties={listings}/>);
    //     }
    //     else {
    //         return(<ListingGrid properties={listings}/>);
    //     }
    // }, [mapView]);

    return (
        <Layout className="home-layout">
            <Header className="home-header">
                <_Header/>
                <Button className = "viewButton" type="primary" onClick={handleToggle}>Change View</Button>
            </Header>

            <Content className="home-content">
                <Filter onFilter={handleFilter}/>
                { loading ? <p>Loading...</p> : ( mapView ? <ListingMap properties={listings} status={loading}/> : <ListingGrid properties={listings}/>) }
            </Content>

            <Footer className="home-footer">
                <Pagination defaultCurrent={1} onChange={onChange} total={500}/>
            </Footer>
        </Layout>
    )
}

export default Home