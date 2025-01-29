import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 

// Insert a Leaflet map centered at the bottom and OpenStreetMap tiles.
function MyMap() {
  const position = [1.35, 103.8];
  return (
    <MapContainer
      className="map"
      center={position}
      zoom={10}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMap;
