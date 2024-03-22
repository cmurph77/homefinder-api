import React, { useEffect, useMemo, useState } from "react";
import { Button, message, Pagination, Layout, FloatButton   } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

// import empty_listings from "@/server/empty-property-object.json";

import _Header from "@/components/header.js";

import ListingGrid from "./components/listingGrid.js";
import ListingMap from "./components/listingMap.js";

import { axios_instance } from "@/utils";

import './index.scss'

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
            console.log("fetching data," , pageNo, pageSize)
            const res = await axios_instance.get(`/get-propertys-by-pagenum-live/${pageNo}/${pageSize}`)
            // const res = await axios_instance.get(`http://localhost:8000/get-propertys-by-pagenum-live/1/20`)
            
                .catch((error)=>{
                        // setListing(empty_listings.properties)
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
                { loading ? <p>Loading...</p> : ( mapView ? <ListingMap properties={listings} status={loading}/> : <ListingGrid properties={listings}/>) }
            </Content>

            <Footer className="home-footer">
                <Pagination defaultCurrent={1} onChange={onChange} total={500}/>
            </Footer>
        </Layout>
    )
}

export default Home