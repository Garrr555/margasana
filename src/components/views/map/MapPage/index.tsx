"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import PopUp from "@/components/fragments/Popup";
import dynamic from "next/dynamic";
import { usePopulationStats } from "@/hook/demografi";
import * as turf from "@turf/turf";
import rtrw from "@/data/rtrw.json";

const HeatmapLayer = dynamic(() => import("@/components/fragments/Heatmap"), {
  ssr: false,
});

type Props = {
  total: boolean;
  kelamin: boolean;
  kepadatan: boolean;
  usia: boolean;
};

const margasanaCoords: any = [
  [-7.533138083431965, 109.13501955115498],
  [-7.5337951288467195, 109.13765555273943],
  [-7.53533320853461, 109.13839363318345],
  [-7.537110206421758, 109.13907146216269],
  [-7.538678139678808, 109.1396137253447],
  [-7.5411420233246105, 109.13970410254291],
  [-7.542575549172739, 109.1399601712672],
  [-7.542978727461772, 109.13883045630405],
  [-7.543456567911051, 109.13739948401525],
  [-7.543232580266178, 109.13631495764884],
  [-7.542381426158528, 109.13541118567645],
  [-7.540395393397063, 109.13517017981775],
  [-7.539379974630819, 109.13488398535998],
  [-7.538334688117715, 109.1352906827471],
  [-7.537155004594169, 109.13577269446444],
  [-7.535273477386596, 109.13539612281085],
  [-7.533854860198545, 109.13495929969025],
  [-7.533108217707678, 109.13503461402286],
];

const newIcon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [40, 40],
});

const normalizeRT_RW = (val: any) => {
  const str = String(val).trim();
  return str.length === 1 ? "0" + str : str;
};

const generateHeatmapPointsInPolygon = (
  center: [number, number],
  radiusMeters: number,
  pointsCount: number,
  polygonCoords: [number, number][]
): [number, number, number][] => {
  const points: [number, number, number][] = [];
  const earthRadius = 6371000;

  const coords = polygonCoords.map(([lat, lng]) => [lng, lat]);

  if (
    coords.length > 0 &&
    (coords[0][0] !== coords[coords.length - 1][0] ||
      coords[0][1] !== coords[coords.length - 1][1])
  ) {
    coords.push(coords[0]);
  }

  const polygon = turf.polygon([coords]);

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
    activeProducts,
  } = usePopulationStats();

  const [productCountPerArea, setProductCountPerArea] = useState<
    Map<string, number>
  >(new Map());

  useEffect(() => {
    console.log("activeProducts:", activeProducts);
    const countMap = new Map<string, number>();

    activeProducts.forEach((item: any) => {
      const rt = normalizeRT_RW(item.rt);
      const rw = normalizeRT_RW(item.rw);

      const matchedFeature = (rtrw.features as any[]).find((feature) => {
        const props = feature.properties;
        return (
          normalizeRT_RW(props.RT) === rt && normalizeRT_RW(props.RW) === rw
        );
      });

      if (matchedFeature) {
        const key = matchedFeature.properties?.id || `${rt}-${rw}`;
        countMap.set(key, (countMap.get(key) || 0) + 1);
      }
    });

    setProductCountPerArea(countMap);
  }, [activeProducts]);

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

          <Polygon
            positions={margasanaCoords}
            pathOptions={{
              color: "blue",
              weight: 2,
              fillColor: "#000000",
              fillOpacity: 0.2,
            }}
          />

          <GeoJSON
            data={rtrw as any}
            style={() => ({
              color: "orange",
              weight: 2,
              fillOpacity: 0.1,
            })}
            onEachFeature={(feature, layer) => {
              const props = feature.properties as {
                RT?: any;
                RW?: any;
                id?: string;
              };
              const key =
                props.id ||
                `${normalizeRT_RW(props.RT)}-${normalizeRT_RW(props.RW)}`;
              console.log(key);
              const count = productCountPerArea.get(key) ?? 0;
              console.log(count);
              layer.bindTooltip(
                `RT ${props.RT} / RW ${props.RW}\nJumlah Produk Aktif: ${count}`,
                { sticky: true }
              );
            }}
          />

          <Marker position={center} icon={newIcon}>
            <Popup>Margasana</Popup>
          </Marker>

          {showHeatmap && <HeatmapLayer points={heatmapPoints} />}

          <LocationTracker setCoords={setCoords} />
        </MapContainer>
      </div>

      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        className="absolute top-3 left-16 bg-primary text-third px-4 py-2 rounded shadow-md hover:bg-primary/80 transition"
      >
        {showHeatmap ? "Sembunyikan Heatmap" : "Tampilkan Heatmap"}
      </button>

      <div className="absolute bottom-11 left-5 bg-primary text-accent border border-accent p-2 rounded-full shadow-md text-sm">
        Koordinat: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
      </div>

      <div className="absolute bottom-11 right-5 bg-primary text-third border border-accent p-2 rounded-lg shadow-md text-sm">
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
