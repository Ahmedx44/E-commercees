import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OrderLocationMap = ({ location }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && location) {
      map.setView([location[0], location[1]], 13);
    }
  }, [map, location]);

  // Add a null check for the location prop
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={[location[0], location[1]]}
      zoom={13}
      style={{ height: "500px", width: "500px" }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location[0], location[1]]}>
        <Popup>Order Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default OrderLocationMap;
