import React from "react";
import ListingCard from "./listingCard.js";
import './listingGrid.css';

export default function ListingGrid(props) {
    if (props.status) {
        return <p>Loading...</p>;
    }
    else{

        const cardList = props.properties.data.map(
            property => <ListingCard 
                    rentPerMonth={property['rent per month']} 
                    img={property['pic'][0]} 
                    address={property.address} 
                    id={property.identifier} 
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
}