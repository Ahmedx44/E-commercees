import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";

const LocationModal = ({ isOpen, onClose, onLocationSelected }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Fetch the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Your selected location</Popup>
      </Marker>
    );
  };

  return (
    <div className={`modal ${isOpen ? "modal--open" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <MapContainer
          center={position || [0, 0]}
          zoom={13}
          style={{ height: "500px", width: "500px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
        {position && (
          <button
            onClick={() => {
              onLocationSelected(position);
              setSelectedLocationLat(position[0]);
              setSelectedLocationLng(position[1]);
            }}
          >
            Select Location
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
