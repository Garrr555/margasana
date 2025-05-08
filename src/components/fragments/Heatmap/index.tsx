"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

type HeatPoint = [number, number, number?]; // lat, lng, intensity (optional)

type HeatmapLayerProps = {
  points: HeatPoint[];
};

const HeatmapLayer = ({ points }: HeatmapLayerProps) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = (L as any)
      .heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.2: "blue",
          0.4: "lime",
          0.6: "orange",
          0.8: "red",
        },
      })
      .addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

export default HeatmapLayer;
