"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon not showing
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Location {
    title: string;
    lat: number;
    lng: number;
}

interface MapProps {
    locations: Location[];
    className?: string;
}

// Helper component to auto-adjust bounds
function SetBounds({ locations }: { locations: Location[] }) {
    const map = useMap(); // Access the underlying Leaflet instance

    useEffect(() => {
        if (locations.length > 0) {
            // Create a boundary object containing all coordinates
            const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));

            // Fit the map to these bounds with some padding
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
        }
    }, [map, locations]);

    return null;
}

export default function Map({ locations, className }: MapProps) {
    return (
        <MapContainer
            // Initial center/zoom are required but will be overridden by SetBounds
            center={[30, 50]}
            zoom={3}
            scrollWheelZoom={false}
            className={`w-full h-full rounded-xl z-0 ${className}`}
            style={{ minHeight: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* This component handles the "first view" logic */}
            <SetBounds locations={locations} />

            {locations.map((loc, index) => (
                <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup>
                        <div className="text-sm font-semibold">{loc.title}</div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}