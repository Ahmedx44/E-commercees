import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ onLocationSelected }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState([
    7.670844000784806, 36.83750152587891,
  ]);
  const [initialZoom, setInitialZoom] = useState(15); // Initial zoom level

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView(markerPosition, initialZoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/"></a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;
    }

    if (!markerRef.current) {
      const marker = L.marker(markerPosition, {
        draggable: true,
        autoPan: true,
      }).addTo(mapRef.current);

      marker.on("dragend", (e) => {
        const { lat, lng } = e.target.getLatLng();
        onLocationSelected({ lat, lng });
        setMarkerPosition([lat, lng]);
        console.log("Marker Position:", [lat, lng]); // Log the marker position
      });

      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(markerPosition);
    }

    return () => {
      // Clean up the map instance and marker when the component is unmounted or re-rendered
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [onLocationSelected, markerPosition, initialZoom]);

  return (
    <div>
      <div id="map" style={{ height: "400px" }} />
      <label htmlFor="zoom">Zoom Level:</label>
      <input
        type="range"
        id="zoom"
        min="2"
        max="18"
        value={initialZoom}
        onChange={(e) => setInitialZoom(parseInt(e.target.value))}
      />
    </div>
  );
};

export default LeafletMap;
