import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Customizing Leaflet's default marker icon
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapFarm = ({ selectedFarm }) => {
    const navigate = useNavigate();
    const mapRef = useRef(); // Create a ref for the map
    const [location, setLocation] = useState([14.0583, 108.2772]); // Default location: Vietnam's center
    const [error, setError] = useState(null);

    // Array of farms with name and coordinates
    const farms = [
        { id: 1, x: location[0], y: location[1], name: 'Your Farm' },
        { id: 2, x: 16.0471, y: 108.2068, name: 'Da Nang Farm' },
        { id: 3, x: 10.8231, y: 106.6297, name: 'Ho Chi Minh Farm' },
        { id: 4, x: 21.0285, y: 105.8542, name: 'Hanoi Farm' },
    ];

    useEffect(() => {
        // Set map center to selected farm location
        if (selectedFarm) {
            const farm = farms.find(f => f.id === selectedFarm.id);
            if (farm && mapRef.current) {
                const map = mapRef.current; // Access the map instance
                map.flyTo([farm.x, farm.y], 15, { duration: 2 }); 
            }
        }
    }, [selectedFarm, farms]);

    useEffect(() => {
        // Try to get user's location if available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation([position.coords.latitude, position.coords.longitude]);
                },
                (err) => {
                    setError(err.message);
                    console.error('Error getting location:', err);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // Function to handle marker click
    const handleMarkerClick = (id) => {
        navigate(`/farm/${id}`);
    };

    return (
        <MapContainer
            ref={mapRef} // Attach the ref to MapContainer
            center={location}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Render markers for each farm */}
            {farms.map((farm) => (
                <Marker
                    key={farm.id}
                    position={[farm.x, farm.y]}
                    eventHandlers={{ click: () => handleMarkerClick(farm.id) }}
                >
                    <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                        <span>{farm.name}</span>
                    </Tooltip>

                    <Popup>
                        <b>Welcome to {farm.name}!</b><br />
                        <span>Click the marker to view details of this farm.</span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapFarm;
