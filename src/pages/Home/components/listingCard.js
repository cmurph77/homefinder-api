import React from "react";
import './listingCard.css';

export default function ListingCard(props) {
    const link = "listing/" + props.id
    return(
        <section className="Card">
            <img src={props.img} className="Card-Image" alt="Listing"/>
            <a className="Address" href={link}>{props.address}</a>
            <b className="Rent">Rent - {props.rentPerMonth}€</b>
            <h2 className="Info">Beds {props.bed} Baths {props.bath}</h2>
        </section>
    );
}