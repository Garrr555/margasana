"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import productServices from "@/services/product";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  nama: string;
  tipe: "usia" | "pertumbuhan";
  waktu: boolean;
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  age: number;
  created_at: { seconds: number; nanoseconds: number };
}

export default function LineChart(props: Props) {
  const { nama, tipe, waktu } = props;

  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  // Filter hanya penduduk dengan status "true"
  const activeProducts = products.filter(
    (product) => product.status === "true"
  );

  // Ekstrak dan hitung jumlah usia yang sama
  const ageCounts: { [key: number]: number } = {};
  activeProducts.forEach((product) => {
    ageCounts[product.age] = (ageCounts[product.age] || 0) + 1;
  });

  const ages = Object.keys(ageCounts).map(Number); // Label usia unik
  const ageData = Object.values(ageCounts); // Jumlah penduduk untuk setiap usia

  // **Mengelompokkan data berdasarkan tahun input**
  const populationByYear: { [year: string]: number } = {};

  activeProducts.forEach((product) => {
    if (product.created_at && product.created_at.seconds) {
      const date = new Date(product.created_at.seconds * 1000); // Konversi ke Date
      const year = date.getFullYear().toString(); // Ambil Tahun
      populationByYear[year] = (populationByYear[year] || 0) + 1;
    }
  });

  // **Mempersiapkan data untuk chart pertumbuhan penduduk**
  const years = Object.keys(populationByYear).sort(); // Urutkan tahun secara kronologis
  const populationCountsYear = years.map((year) => populationByYear[year]);

  // const data = {
  //   labels: tipe === "usia" ? ages : years,
  //   datasets: [
  //     {
  //       label:
  //         tipe === "usia" ? "Usia Penduduk" : "Pertumbuhan Penduduk per Tahun",
  //       data: tipe === "usia" ? ageData : populationCounts,
  //       borderColor: tipe === "usia" ? "#00ff99" : "#ff5733",
  //       backgroundColor:
  //         tipe === "usia" ? "rgba(0, 255, 153, 0.5)" : "rgba(255, 87, 51, 0.5)",
  //       tension: 0.3,
  //     },
  //   ],
  // };





  // Mengelompokkan data berdasarkan tanggal input
  const populationByDate: { [date: string]: number } = {};

  activeProducts.forEach((product) => {
    if (product.created_at && product.created_at.seconds) {
      const date = new Date(product.created_at.seconds * 1000); // Konversi ke Date
      const dateString = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
      populationByDate[dateString] = (populationByDate[dateString] || 0) + 1;
    }
  });

  // **Mempersiapkan data untuk chart pertumbuhan penduduk per hari**
  const dates = Object.keys(populationByDate).sort(); // Urutkan tanggal secara kronologis
  const populationCountsDate = dates.map((date) => populationByDate[date]);

   const data = {
     labels: tipe === "usia" ? ages.map(String) : waktu ? dates : years,
     datasets: [
       {
         label:
           tipe === "usia"
             ? `Jumlah Penduduk`
             : `Pertumbuhan Penduduk per ${waktu ? "hari" : "tahun"}`,
         data:
           tipe === "usia"
             ? ageData
             : waktu
             ? populationCountsDate
             : populationCountsYear,
         borderColor: tipe === "usia" ? "#00ff99" : "#ff5733",
         backgroundColor:
           tipe === "usia"
             ? "rgba(0, 255, 153, 0.5)"
             : "rgba(255, 87, 51, 0.5)",
         tension: 0.3,
       },
     ],
   };

  return (
    <div className="w-full bg-secondary shadow-lg rounded-lg p-6 ">
      <h2 className="text-xl font-semibold text-accent text-center mb-4">
        {nama}
      </h2>
      <div className="w-full h-96 mx-auto">
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top" as const,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
