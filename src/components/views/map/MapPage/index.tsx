"use client";

import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon, Control } from "leaflet";
import "leaflet/dist/leaflet.css";
import PopUp from "@/components/fragments/Popup";

type Props = {
  total:boolean,
  kelamin:boolean,
  kepadatan: boolean,
  usia: boolean
}

// Icon Custom
const newIcon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [40, 40],
});

// Komponen MiniMap
const MiniMapComponent = () => {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 w-32 h-32 border-2 border-primary shadow-md rounded-md overflow-hidden">
      <MapContainer
        center={map.getCenter()}
        zoom={map.getZoom() - 7}
        scrollWheelZoom={true}
        className="w-full h-full"
        dragging={true}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={map.getCenter()} icon={newIcon} />
      </MapContainer>
    </div>
  );
};

// Komponen untuk Menangkap Pergerakan Kursor
const LocationTracker = ({
  setCoords,
}: {
  setCoords: (coords: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    mousemove: (event) => {
      setCoords({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return <MiniMapComponent />;
};

export default function MapPage(prop:Props) {
  const [coords, setCoords] = useState({ lat: -7.5383336, lng: 109.1365494 });
  const {total, kepadatan, kelamin, usia} = prop

  return (
    <div className="relative container flex justify-center pb-10 h-screen">
      <div className="w-full h-full z-0">
        <MapContainer
          center={[-7.5383336, 109.1365494]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full border-2 border-accent rounded-xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-7.5383336, 109.1365494]} icon={newIcon}>
            <Popup>
              {/* <PopUp /> */} Margasana
            </Popup>
          </Marker>
          <LocationTracker setCoords={setCoords} />
        </MapContainer>
      </div>

      {/* Koordinat Mouse */}
      <div className="absolute bottom-11 left-5 bg-primary text-accent border border-accent p-2 rounded-full shadow-md text-sm">
        Koordinat: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
      </div>

      <div className="absolute bottom-11 right-5 bg-primary text-white/80 border border-accent p-2 rounded-lg shadow-md text-sm">
        <PopUp total={total} kepadatan={kepadatan} kelamin={kelamin} usia={usia}/>
      </div>
    </div>
  );
}
