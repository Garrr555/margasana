"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import productServices from "@/services/product";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AREA_MARGASANA_KM2 = 3.5;

type Props = {
  nama: string;
  tipe: "jumlah" | "kepadatan";
  waktu: boolean;
  datartrw: any;
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  created_at: { seconds: number; nanoseconds: number };
}

export default function BarChartMap({ nama, tipe, waktu, datartrw }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(datartrw)
  console.log(products)

  useEffect(() => {
    const getAllProducts = () => {
      setProducts(datartrw);
    };
    getAllProducts();
  }, []);

  const activeProducts = products.filter(
    (product) => product.status === "true"
  );

  const populationByDate: { [date: string]: number } = {};
  let cumulativeSum = 0;

  activeProducts
    .sort((a, b) => a.created_at.seconds - b.created_at.seconds)
    .forEach((product) => {
      if (product.created_at && product.created_at.seconds) {
        const date = new Date(product.created_at.seconds * 1000);
        const key = waktu
          ? date.toISOString().split("T")[0] // Format YYYY-MM-DD jika waktu true
          : date.getFullYear().toString(); // Format YYYY jika waktu false

        cumulativeSum += 1; // Menambah jumlah secara kumulatif
        populationByDate[key] = cumulativeSum;
      }
    });

  const labels = Object.keys(populationByDate).sort();
  const populationCounts = labels.map((date) => populationByDate[date]);

  const densityByDate = labels.reduce<{ [date: string]: number }>(
    (acc, date) => {
      acc[date] = Math.round(populationByDate[date] / AREA_MARGASANA_KM2);
      return acc;
    },
    {}
  );

  const populationDensities = labels.map((date) => densityByDate[date]);

  const colors = ["#e11d48", "#14b8a6", "#a855f7", "#4ade80", "#ec4899"];
  const barColors = labels.map((_, index) => colors[index % colors.length]);

  const data = {
    labels,
    datasets: [
      {
        label: tipe === "jumlah" ? "Jumlah" : "Kepadatan (jiwa/km²)",
        data: tipe === "jumlah" ? populationCounts : populationDensities,
        backgroundColor: barColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-secondary shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-accent text-center mb-4">{`${nama}`}</h2>
      <div className="w-full h-96 mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
