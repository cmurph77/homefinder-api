import React from "react";
import ListingCard from "./listingCard.js";
import './listingGrid.css';

export default function ListingGrid(props) {

    const cardList = props.properties.map(
        property => <ListingCard 
                rentPerMonth={property['rent per month']} 
                img={property['img1_size720x480']} 
                address={property.address} 
                id={property.id} 
                bed={property["property-type"]['bed']} 
                bath={property["property-type"]['bath']} 
            />
    )
    
    return(
        <section className="ListingGrid">
            {cardList}
        </section>
    );
}