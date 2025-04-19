'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState } from "react";
import Button from "@/components/ui/button";
import { usePopulationStats } from "@/hook/demografi";

export default function StatAdminView(){
  const {
      totalPopulation,
      menCount,
      womenCount,
      averageAge,
      populationDensity,
      growthRate,
    } = usePopulationStats();

  const [waktu, setWaktu] = useState(false)
  function toogleWaktu(){
    setWaktu(!waktu)
  }
   return (
     <AdminLayout>
       <div className="flex flex-col justify-center items-start gap-5">
         <div className="w-full flex justify-end items-center">
           <Button
             type="button"
             bgcolor="bg-accent rounded-xl"
             textcolor="text-primary"
             onClick={toogleWaktu}
           >{`${waktu ? "Day" : "Year"}`}</Button>
         </div>
         <div className="w-full grid grid-cols-2 gap-8 text-center">
           {[
             { title: "Total Penduduk", value: `${totalPopulation} Jiwa` },
             {
               title: "Kepadatan Penduduk",
               value: `${populationDensity} Jiwa/km²`,
             },
             { title: "Rata-rata Usia", value: `${averageAge} Tahun` },
             {
               title: "Pertumbuhan Penduduk",
               value:
                 growthRate !== null ? `${growthRate}%` : "Data belum tersedia",
             },
           ].map((item, index) => (
             <div
               key={index}
               className="w-full p-6 bg-secondary shadow-lg rounded-xl transition-transform"
             >
               <h3 className="text-xl font-semibold text-white/80">
                 {item.title}
               </h3>
               <p className="text-2xl font-bold text-accent">{item.value}</p>
             </div>
           ))}
         </div>
         <div className="w-full">
           <LineChart
             nama="Pertumbuhan Penduduk"
             tipe="pertumbuhan"
             waktu={waktu}
           />
         </div>
         <div className="w-full">
           <LineChart nama="Usia Penduduk" tipe="usia" waktu={waktu} />
         </div>
         <div className="w-full">
           <BarChart nama="Jumlah Penduduk" tipe="jumlah" waktu={waktu} />
         </div>
         <div className="w-full">
           <BarChart
             nama="Kepadatan Penduduk (jiwa/km²)"
             tipe="kepadatan"
             waktu={waktu}
           />
         </div>
         <div className="w-full">
           <PieChart nama="Jenis Kelamin" />
         </div>

         <div>{/* <Doughnut /> */}</div>
       </div>
     </AdminLayout>
   );
}