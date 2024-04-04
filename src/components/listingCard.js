import React from "react";
import './listingCard.css';

export default function ListingCard(props) {
    const link = "listing/" + props.id
    return(
        <section className="Card">
            <img src={props.img[0]} className="Card-Image" alt="Listing"/>
            <a clasname="Address" href={link}>{props.address}</a>
            <b clasname="Rent">Rent - {props.rentPerMonth}€</b>
            <h2 clasname="Info">Beds {props.bed} Baths {props.bath}</h2>
        </section>
    );
}