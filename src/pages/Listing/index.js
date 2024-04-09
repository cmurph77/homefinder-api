import { useParams } from "react-router-dom"
import { Divider, Button  } from 'antd'
import { axios_instance } from '@/utils'
import { useEffect, useState } from "react"
import _Header from "@/components/header.js";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Carousel from "./components/Carousel"
import UserList from "./components/UserList";
import { useSelector } from 'react-redux';


import './index.scss'

import { Layout  } from 'antd';
const { Header, Content } = Layout;

const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};


const Listing = () => {
    const user_id = useSelector(state => state.user.userId)

    const [ data, setData ] = useState('')
    const [ loading, setLoading ] = useState(true)

    const [liked, setLiked] = useState(false)
    
    const params = useParams()
    const property_id = params.id
    // const user = auth.currentUser

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true)
            const res = await axios_instance.get(`/get-property-by-id-live/${property_id}`)
            .then((response)=>{
                axios_instance.get(`/check-user-liked-property/${user_id}/${property_id}`)
                .then((resaaa) => {
                    console.log(resaaa)
                    if(resaaa.data === "Success"){
                        setLiked(true)
                    }
                    else{
                        setLiked(false)
                    }
                    setData(response.data)
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                })
            })
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
        }
        fetchData()
    },[])

    const toggleLike = async () => {
        if(liked) {
            await axios_instance.put(`/unlike-property/${user_id}/${property_id}`)
        }else{
            await axios_instance.put(`/like-property/${user_id}/${property_id}`)
        }
        await setLiked(!liked)
    }

    const Info = () => {
        return (
        <Content className="listing-content">
            <Carousel
                pics={data.pic}
            />
        
            <div className="listing-info">
                <h1 className="listing-address">{data["property-type"]["bed"]} Bedroom {data["property-type"]["type-info"][2]}, {data.address}</h1>
                <div className="listing-price">
                    <h2>€ {formatRent(data["rent per month"]) } per month</h2>
                </div>
                <div className="listing-cardInfo">
                    <p className="cardInfo-bed">{data["property-type"]["bed"]}</p>
                    <p className="cardInfo-bath">{data["property-type"]["bath"]}</p>
                    <p className="cardInfo-type">{data["property-type"]["type-info"][2]}</p>
                </div>
                <Button
                    type="text"
                    icon={liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                    onClick={toggleLike}
                >
                    {liked ? 'Liked' : 'Like'}
                </Button>
                <Divider/>
                <div className="listing-overview">
                    <h3>Property Overview</h3>
                    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                        <li>
                            <span>Available From: </span>Immediately
                        </li>
                        <li>
                            <span>Furnished: </span>Yes
                        </li>
                        <li>
                            <span>Lease: </span> Minimum 6 Months
                        </li>
                    </ul>
                </div>
            </div>
            <Divider/>
            { liked ? <UserList property_id={property_id}/> : null}
        </Content>)
    }

    return (
        <div className="listing-container">
            <Layout className="listing-layout">
                <Header className="listing-header">
                    <_Header property={'property page'}/>
                </Header>
                { loading ? <p>Loading</p> : <Info/> }
            </Layout>
        </div>
    )
}

export default Listing