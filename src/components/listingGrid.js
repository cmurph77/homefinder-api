import React, { useMemo } from "react";
import ListingCard from "./listingCard.js";
import './listingGrid.css';

export default function ListingGrid(props) {
    const cardList = props.properties.map(property => <ListingCard rentPerMonth={property.rentpermonth} img={property.pic} address={property.address} id={property.id} bed={property.propertytype.bed} bath={property.propertytype.bath} />)
    
    return(
        <section className="ListingGrid">
            {cardList}
        </section>
    );
}