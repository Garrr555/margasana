"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import PopUp from "@/components/fragments/Popup";
import dynamic from "next/dynamic";
import { usePopulationStats } from "@/hook/demografi";
import * as turf from "@turf/turf";

// Komponen heatmap dimuat secara dinamis
const HeatmapLayer = dynamic(() => import("@/components/fragments/Heatmap"), {
  ssr: false,
});

type Props = {
  total: boolean;
  kelamin: boolean;
  kepadatan: boolean;
  usia: boolean;
};

// Koordinat Polygon batas desa Margasana
const margasanaCoords: any = [
  [-7.542342097110234, 109.13597832000801],
  [-7.54247823790711, 109.13716278246126],
  [-7.542069814738854, 109.13759193590364],
  [-7.542171920891644, 109.1386734031023],
  [-7.543346135048223, 109.13958320892402],
  [-7.543312100408171, 109.14009819305488],
  [-7.540793490665171, 109.13930854967317],
  [-7.538428027153751, 109.13946304517435],
  [-7.5364879964945155, 109.13870773485384],
  [-7.535228673928965, 109.13700828826973],
  [-7.533628988454129, 109.1370254541455],
  [-7.533611970752495, 109.13536033800325],
  [-7.535466924372265, 109.13642463932617],
  [-7.537492048660166, 109.13611564832378],
  [-7.5386662755122735, 109.13542900281597],
  [-7.53967032262667, 109.13524017556325],
  [-7.539789446805067, 109.13606415069648],
  [-7.541780514815539, 109.13573799381835],
  [-7.542342097110234, 109.13597832000801], // titik pertama untuk menutup polygon
];

// Icon marker kustom
const newIcon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [40, 40],
});

// Komponen minimap
const MiniMapComponent = () => {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 w-32 h-32 border-2 border-primary shadow-md rounded-md overflow-hidden z-[1000]">
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

// Tracker posisi kursor
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

// Fungsi membuat titik heatmap
const generateHeatmapPointsInPolygon = (
  center: [number, number],
  radiusMeters: number,
  pointsCount: number,
  polygonCoords: [number, number][]
): [number, number, number][] => {
  const points: [number, number, number][] = [];
  const earthRadius = 6371000;

  const polygon = turf.polygon([
    polygonCoords.map(([lat, lng]) => [lng, lat]), // GeoJSON format
  ]);

  while (points.length < pointsCount) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radiusMeters;

    const dx = distance * Math.cos(angle);
    const dy = distance * Math.sin(angle);

    const deltaLat = dy / earthRadius;
    const deltaLng = dx / (earthRadius * Math.cos((center[0] * Math.PI) / 180));

    const lat = center[0] + deltaLat * (180 / Math.PI);
    const lng = center[1] + deltaLng * (180 / Math.PI);

    const pt = turf.point([lng, lat]);
    if (turf.booleanPointInPolygon(pt, polygon)) {
      const intensity = 0.6 + Math.random() * 0.4;
      points.push([lat, lng, intensity]);
    }
  }

  return points;
};


// Komponen utama halaman peta
export default function MapPage(prop: Props) {
  const [coords, setCoords] = useState({ lat: -7.5383336, lng: 109.1365494 });
  const [showHeatmap, setShowHeatmap] = useState(false);
  const { total, kepadatan, kelamin, usia } = prop;
  const center: [number, number] = [-7.5383336, 109.1365494];
  const {
    totalPopulation,
    menCount,
    womenCount,
    averageAge,
    populationDensity,
    growthRate,
  } = usePopulationStats();
  console.log(totalPopulation)


  const [heatmapPoints, setHeatmapPoints] = useState<
    [number, number, number][]
  >([]);

  useEffect(() => {
    if (totalPopulation > 0) {
      const points = generateHeatmapPointsInPolygon(
        center,
        500,
        totalPopulation,
        margasanaCoords
      );
      setHeatmapPoints(points);
    }
  }, [totalPopulation]);



  return (
    <div className="relative container flex justify-center pb-10 h-screen">
      <div className="w-full h-full z-0">
        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoom={true}
          className="w-full h-full border-2 border-accent rounded-xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Batas polygon manual */}
          <Polygon
            positions={margasanaCoords}
            pathOptions={{
              color: "blue",
              weight: 2,
              fillColor: "#000000",
              fillOpacity: 0.2,
            }}
          />

          {/* Marker pusat desa */}
          <Marker position={center} icon={newIcon}>
            <Popup>Margasana</Popup>
          </Marker>

          {/* Heatmap */}
          {showHeatmap && <HeatmapLayer points={heatmapPoints} />}

          <LocationTracker setCoords={setCoords} />
        </MapContainer>
      </div>

      {/* Tombol toggle heatmap */}
      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        className="absolute top-3 left-16 bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primary/80 transition"
      >
        {showHeatmap ? "Sembunyikan Heatmap" : "Tampilkan Heatmap"}
      </button>

      {/* Koordinat kursor */}
      <div className="absolute bottom-11 left-5 bg-primary text-accent border border-accent p-2 rounded-full shadow-md text-sm">
        Koordinat: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
      </div>

      {/* PopUp Data Demografi */}
      <div className="absolute bottom-11 right-5 bg-primary text-white/80 border border-accent p-2 rounded-lg shadow-md text-sm">
        <PopUp
          total={total}
          kepadatan={kepadatan}
          kelamin={kelamin}
          usia={usia}
        />
      </div>
    </div>
  );
}
