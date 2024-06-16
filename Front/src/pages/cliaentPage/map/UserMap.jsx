import React, { useState, useEffect, useRef } from "react";
import L from "leaflet"; // Remember that this must also be imported
import "leaflet.offline";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerImg from "../../../images/marker_20px.png";

const myIcon = new L.Icon({
  iconUrl: MarkerImg,
  iconRetinaUrl: MarkerImg,
  popupAnchor: [-0, -0],
  iconSize: [20, 20],
});

const UserMap = ({ pos, setPos }) => {
  const [map, setMap] = useState();

  const mapRef = useRef(null);
  const latitude = -21.45;
  const longitude = 47.1;

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPos({ ...pos, markerLat: lat, markerLng: lng });
  };

  return (
    <div>
      <h4>Selection de l'adresse de livraison</h4>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        ref={mapRef}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventsHandler handleMapClick={handleMapClick} />
        <Marker position={[pos.markerLat, pos.markerLng]} icon={myIcon}>
          <Popup>Adresse de livraison.</Popup>
        </Marker>
        {/* Additional map layers or components can be added here */}
      </MapContainer>
    </div>
  );
};

const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export default UserMap;
