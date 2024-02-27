import React, { useEffect } from 'react';
import L from 'leaflet';
import './listingMap.css';

export default function ListingMap(props) {
  const linkList = props.properties.map(
    property =>  "listing/" + props.id
  )

  const latlngList =props.properties.map(
    property => new L.latLng(property.latitude, property.longitude)
  )

  useEffect(() => {
    // create map
    var map = L.map('map', {
      center: [53.3302, -6.2106],
      zoom: 11,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
    for (let i = 0; i < latlngList.length; i++) {
      var marker = L.marker(latlngList[i]).addTo(map).bindPopup('<a href="' + linkList[i].toString() + '">Go to Property Page</a>').openPopup();
    }
  }, [linkList, latlngList]);


  return(
    <section className="ListingMap">
      <div id="map" />
    </section>
  );
}