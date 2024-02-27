import React from "react";
import './listingCard.css';

export default function ListingCard(props) {
    const link = "listing/" + props.id
    return(
        <section className="Card">
            <img src={props.img} className="Card-Image" alt="Listing"/>
            <a classname="Address" href={link}>{props.address}</a>
            <b classname="Rent">Rent - {props.rentPerMonth}€</b>
            <h2 classname="Info">Beds {props.bed} Baths {props.bath}</h2>
        </section>
    );
}