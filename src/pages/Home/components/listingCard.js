import React from "react";
import './listingCard.css';
import { useNavigate } from 'react-router-dom'

const formatRent = (rent) => {
    const parts = rent.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

export default function ListingCard(props) {
    const navigate = useNavigate()
    const link = "listing/" + props.id
    const rent =  '€ '+ formatRent(props.rentPerMonth) + '/month'
    return(
        <section className="Card">
            <img 
                src={props.img} 
                className="Card-Image" 
                alt="Listing" 
                onClick={()=>navigate(link)}
                style={{cursor: 'pointer'}}
            />
            <a className="Address" href={link}>{props.address}</a>
            <b className="Rent">Rent-   {rent}</b>
            <h2 className="Info">{props.bed} {props.bath}</h2>
        </section>
    );
}