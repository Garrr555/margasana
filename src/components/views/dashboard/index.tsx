import dynamic from "next/dynamic";
import Image from "next/image";
import { usePopulationStats } from "@/hook/demografi";
import { motion } from "framer-motion";

const MapView = dynamic(() => import("@/components/views/map/MapView"), {
  ssr: false,
});

export default function DashboardView() {
  const {
    totalPopulation,
    menCount,
    womenCount,
    averageAge,
    populationDensity,
    growthRate,
  } = usePopulationStats();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex justify-center items-center overflow-hidden">
        {/* Gambar dengan animasi zoom-in */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            alt="desa"
            src={"/desa/demo.jpg"}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </motion.div>

        {/* Overlay gradasi atas & bawah */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary"></div>

        {/* Teks & Logo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute text-white text-center flex flex-col items-center gap-6 px-6 md:px-20"
        >
          <Image
            alt="logo"
            src={"/desa/logo-bms.png"}
            width={120}
            height={120}
          />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Website Demografi Desa <br />
            <span className="text-accent font-extrabold">Margasana</span>
          </h1>
          <p className="text-lg font-bold text-third max-w-2xl">
            Website ini menyajikan informasi seputar demografi Desa Margasana,
            termasuk jumlah penduduk, kepadatan, pertumbuhan, serta peta
            interaktif.
          </p>
        </motion.div>
      </div>

      {/* Section Statistik Demografi */}
      <section className="py-16 px-6 md:px-20 text-center bg-primary">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-third mb-6"
        >
          Statistik Demografi
        </motion.h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[
            { title: "Total Penduduk", value: totalPopulation },
            {
              title: "Kepadatan Penduduk",
              value: `${populationDensity} Jiwa/km²`,
            },
            { title: "Rata-rata Usia", value: averageAge },
            { title: "Pertumbuhan Penduduk", value: growthRate !== null ? `${growthRate}%` : "Data belum tersedia" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="w-96 p-6 bg-secondary shadow-lg rounded-xl transition-transform"
            >
              <h3 className="text-xl font-semibold text-third">
                {item.title}
              </h3>
              <p className="text-2xl font-bold text-accent">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Peta Interaktif */}
      <section className="py-16 px-6 md:px-20 text-center bg-primary">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-third mb-6"
        >
          Peta Interaktif
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg text-third mb-6"
        >
          Gunakan peta interaktif untuk mengeksplorasi informasi demografi Desa
          Margasana.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-xl overflow-hidden"
        >
          {/* Placeholder untuk peta */}
          <MapView />
        </motion.div>
      </section>
    </div>
  );
}
