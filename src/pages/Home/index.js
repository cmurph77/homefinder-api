import React, { useEffect, useMemo, useState } from "react";
import { Button, message, Pagination, Layout, FloatButton, Spin   } from 'antd'
import { EnvironmentOutlined, AppstoreOutlined } from '@ant-design/icons'
import _Header from "@/components/header.js";
import ListingGrid from "./components/listingGrid.js";
import ListingMap from "./components/listingMap.js";
import Filter from "./components/filter.js";
import { axios_instance } from "@/utils";

import './index.scss'

const { Header, Footer, Content } = Layout;
const Home = () => {
    const [listings, setListing ] = useState()

    // --------- Page Number ------
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);

    const onChange = (page, pageSize) => {
        console.log("change page.",page,pageSize )
        setPageNo(page)
        setPageSize(pageSize)
    }

    // --------- Filter ------
    const [rentVal, setRentVal] = useState([0, 5000]);
    const [bathVal, setBathVal] = useState([0, 6]);
    const [bedVal, setBedVal] = useState([0, 6]);

    const handleFilter = (RentVal, BedVal, BathVal) => 
    {
        console.log("Filtered: Baths ", BathVal[0] , " ", BathVal[1], " Beds ", BedVal[0] , " ", BedVal[1], " Rent ", RentVal[0] , " ", RentVal[1]);
        setBathVal(BathVal);
        setBedVal(BedVal);
        setRentVal(RentVal);
    };
    
    // Fetch Data based on page number and page size.
    useEffect(  ()=>{
        const requestParams = {
            min_rent: rentVal[0],
            max_rent: rentVal[1],
            min_bed: bedVal[0],
            max_bed: bedVal[1],
            min_bath: bathVal[0],
            max_bath: bathVal[1],
            page_num: pageSize,
            num_results: pageNo
        }

        const fetchData = async () => {
            setLoading(true)
            const res = await axios_instance.post('/get-propertys-with-filter-live/', requestParams, 
                { headers: { 'Content-Type': 'application/json'}}
            )
                .catch((error)=>{
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
        }
        fetchData()
    },[pageNo, pageSize, rentVal, bedVal, bathVal])

    const LoadingComponent = () => {
        return(
            <Spin tip="Loading" size="large">
                <div className="loading-container" />
            </Spin>
        )
    }
    const [mapView, setView] = useState(false);

    const handleToggle = () => {
        setView((current) => !current);
        if(!mapView)
        {
            setPageNo(1)
            setPageSize(10000)
        }
        else
        {
            setPageSize(10)
        }
    };

    

    return (
        <Layout className="home-layout">
            <Header className="home-header">
                <_Header/>
            </Header>

            <Content className="home-content">
                <Filter onFilter={handleFilter}/>
                { loading ? <LoadingComponent/> : ( mapView ? <ListingMap properties={listings} status={loading}/> : <ListingGrid properties={listings}/>) }
            </Content>

            <Footer className="home-footer">
                {mapView ? null : <Pagination defaultCurrent={1} onChange={onChange} total={500} defaultPageSize={20} pageSizeOptions={[ 20, 40, 100]}/> }
            </Footer>
            <FloatButton.BackTop 
                style={{
                    right: 84,
                }}
            />
            <FloatButton
                icon={mapView ? <AppstoreOutlined /> : <EnvironmentOutlined /> }
                type="primary"
                onClick={handleToggle}
            />
            
        </Layout>
    )
}

export default Home