
import Button from "@/components/ui/button";
import BarChartMap from "@/components/views/admin/statmap/BarChart";
import LineChartMap from "@/components/views/admin/statmap/LineChart";
import PieChartMap from "@/components/views/admin/statmap/PieChart";
import { usePopulationStats } from "@/hook/demografi";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StatRTRWPage() {
  const router = useRouter();
  const { rt, rw } = router.query;
  const {
    totalPopulation,
    menCount,
    womenCount,
    averageAge,
    populationDensity,
    growthRate,
    activeProducts,
  } = usePopulationStats();

  const [waktu, setWaktu] = useState(false);
  function toogleWaktu() {
    setWaktu(!waktu);
  }
  
    console.log(activeProducts);
    console.log(rt, rw);
  
    if (!rt || !rw) {
      return <div>Loading...</div>;
    }
  
    const filteredPopulation = activeProducts.filter(
      (person: any) => 0+person.rt === rt && 0+person.rw === rw
    );
  
    console.log(filteredPopulation.length);

  return (
    <div className="container my-10 ">
      <h1 className="text-2xl font-bold mb-4">
        Statistik Penduduk RT:<span className="text-accent"> {rt}</span> - RW:
        <span className="text-accent"> {rw}</span>
      </h1>
      {filteredPopulation.length === 0 ? (
        <p>
          Tidak ada data penduduk untuk RT {rt} RW {rw}.
        </p>
      ) : (
        <div className="flex flex-col justify-center items-start gap-5">
          <div className="w-full flex justify-end items-center">
            <Button
              type="button"
              bgcolor="bg-accent rounded-xl"
              textcolor="text-primary"
              onClick={toogleWaktu}
            >{`${waktu ? "Day" : "Year"}`}</Button>
          </div>
          {/* <div className="w-full grid grid-cols-2 gap-8 text-center">
            {[
              { title: "Total Penduduk", value: `${filteredPopulation.length} Jiwa` },
              {
                title: "Kepadatan Penduduk",
                value: `${populationDensity} Jiwa/km²`,
              },
              { title: "Rata-rata Usia", value: `${averageAge} Tahun` },
              {
                title: "Pertumbuhan Penduduk",
                value:
                  growthRate !== null
                    ? `${growthRate}%`
                    : "Data belum tersedia",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-full p-6 bg-secondary shadow-lg rounded-xl transition-transform"
              >
                <h3 className="text-xl font-semibold text-third">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-accent">{item.value}</p>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full rounded-lg overflow-hidden">
            <PieChartMap
              datartrw={filteredPopulation}
              nama="Jenis Kelamin"
              parameter="kelamin"
            />
            <PieChartMap
              datartrw={filteredPopulation}
              nama="Agama"
              parameter="agama"
            />
            <PieChartMap
              datartrw={filteredPopulation}
              nama="Status Pernikahan"
              parameter="status"
            />
            <PieChartMap
              datartrw={filteredPopulation}
              nama="Pendidikan Terakhir"
              parameter="pendidikan"
            />
          </div>
          <div className="w-full">
            <LineChartMap
              nama="Pertumbuhan Penduduk"
              tipe="pertumbuhan"
              waktu={waktu}
              datartrw={filteredPopulation}
            />
          </div>
          <div className="w-full">
            <LineChartMap
              nama="Usia Penduduk"
              tipe="usia"
              waktu={waktu}
              datartrw={filteredPopulation}
            />
          </div>
          <div className="w-full">
           <BarChartMap nama="Jumlah Penduduk" tipe="jumlah" waktu={waktu} datartrw={filteredPopulation}/>
         </div>
         <div className="w-full">
           <BarChartMap
             nama="Kepadatan Penduduk (jiwa/km²)"
             tipe="kepadatan"
             waktu={waktu}
             datartrw={filteredPopulation}
           />
         </div>
        </div>
      )}
    </div>
  );
}
