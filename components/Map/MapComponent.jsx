import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = React.useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onLocationSelect({ lat, lng });
      },
    });

    return position === null ? null : (
      <div className="location-info">
        Latitude: {position.lat}, Longitude: {position.lng}
      </div>
    );
  };

  return (
    <MapContainer center={[-3.71722, -38.54337]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
