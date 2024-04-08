import { useParams } from "react-router-dom"
import { Divider, Button  } from 'antd'
import { axios_instance } from '@/utils'
import { useEffect, useState } from "react"
import _Header from "@/components/header.js";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Carousel from "./components/Carousel"
import UserList from "./components/UserList";
// import { auth } from "../@/firebase";

import './index.scss'

import { Layout  } from 'antd';
const { Header, Content } = Layout;

const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};


const Listing = () => {
    const user_id = 'YSixicUz'

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
            // .then((response)=>{
            // })
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
            await setData(res.data)
            await setLoading(false)
        }
        fetchData()
    },[])

    const toggleLike = async () => {
        if(liked) {
            const res_unliked = await axios_instance.put(`/unlike-property/${user_id}/${property_id}`)
            console.log(res_unliked)
        }else{
            const res_liked = await axios_instance.put(`/like-property/${user_id}/${property_id}`)
            console.log(res_liked)
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
            { liked ? <UserList/> : null}
        </Content>)
    }

    return (
        <div className="listing-container">
            <Layout className="listing-layout">
                <Header className="listing-header">
                    {/* this is property {id} */}
                    <_Header/>
                </Header>
                { loading ? <p>Loading</p> : <Info/> }
            </Layout>
        </div>
    )
}

export default Listing