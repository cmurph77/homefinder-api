import React from "react";
import './listingCard.scss';
import { useNavigate } from 'react-router-dom'
import { Card, Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Meta } = Card;
const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

export default function ListingCard(props) {
    const navigate = useNavigate()
    const link = "listing/" + props.id
    const rent =  '€ '+ formatRent(props.rentPerMonth) + ' /month'
    return(
        <Card
            style={{
                width: 260,
                backgroundColor: '#f9f0ff',
            }}
            cover={
                <img
                    alt="Listing"
                    src={props.img}
                    style={{
                        minHeight: 173,
                    }}
                />
            }
            className="home-listingcard"
        >
            
            <p className="cardbody-address">{props.address}</p>
            <Divider className="cardbody-divider"/>
            <div className="cardbody-info" onClick={()=>navigate(link)} style={{cursor: 'pointer'}}>
                <p className="cardbody-rent">{rent}</p>
                <div className="cardbody-details">
                    <span className="cardbody-bed">{props.bed}</span>
                    <span className="cardbody-bath">{props.bath}</span>
                    <span className="cardbody-type">Apartment</span>
                </div>
                <span className="cardbody-icon"><RightOutlined /></span>
            </div>
        </Card>
    );
}