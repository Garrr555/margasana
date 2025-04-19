import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapView(){

    const newIcon = new Icon({
        iconUrl: "/marker.svg",
        iconSize: [40, 40],
    })

    return (
      <MapContainer center={[-7.5383336, 109.1365494]} zoom={13} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-7.5383336, 109.1365494]} icon={newIcon}>
          <Popup>
            Margasana Village
          </Popup>
        </Marker>
      </MapContainer>
    );
}