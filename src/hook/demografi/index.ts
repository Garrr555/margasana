import { useEffect, useState } from "react";
import productServices from "@/services/product"; // Menggunakan productServices

// Konstanta luas wilayah Desa Margasana dalam km²
const AREA_MARGASANA_KM2 = 3.5;

// Struktur data untuk statistik populasi
interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  age: number;
  created_at: string; // Tambahkan field created_at
}

interface PopulationStats {
  totalPopulation: number;
  previousPopulation: number | null;
  menCount: number;
  womenCount: number;
  averageAge: number;
  populationDensity: number;
  growthRate: number | null;
  activeProducts: Product[];
}

export function usePopulationStats(): PopulationStats {
  const [stats, setStats] = useState<PopulationStats>({
    totalPopulation: 0,
    previousPopulation: null,
    menCount: 0,
    womenCount: 0,
    averageAge: 0,
    populationDensity: 0,
    growthRate: null,
    activeProducts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Ambil data penduduk dari productServices
        const { data } = await productServices.getAllProducts();
        const activeProducts: Product[] = data.data.filter(
          (product: Product) => product.status === "true"
        );

        console.log(activeProducts)

        if (!activeProducts || activeProducts.length === 0) {
          console.warn("Tidak ada data populasi tersedia.");
          return;
        }

        // 🔹 Urutkan data berdasarkan `created_at` (terbaru ke terlama)
        const sortedData = activeProducts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // 🔹 Ambil data terbaru dan tahun sebelumnya
        const currentData = sortedData[0]; // Data terbaru
        const previousData = sortedData.find((item) => {
          const currentYear = new Date(currentData.created_at).getFullYear();
          const itemYear = new Date(item.created_at).getFullYear();
          return itemYear === currentYear - 1; // Ambil data tahun sebelumnya
        });

        const totalPopulation = activeProducts.length;
        const previousPopulation = previousData
          ? activeProducts.filter(
              (item) =>
                new Date(item.created_at).getFullYear() ===
                new Date(previousData.created_at).getFullYear()
            ).length
          : null;

        // Hitung statistik lainnya
        const menCount = activeProducts.filter(
          (p) => p.category === "men"
        ).length;
        const womenCount = activeProducts.filter(
          (p) => p.category === "women"
        ).length;
        const totalAge = activeProducts.reduce(
          (sum, product) => sum + Number(product.age),
          0
        );
        const averageAge =
          totalPopulation > 0 ? Math.round(totalAge / totalPopulation) : 0;

        const populationDensity =
          totalPopulation > 0
            ? Math.round(totalPopulation / AREA_MARGASANA_KM2)
            : 0;

        // 🔹 Hitung laju pertumbuhan penduduk
        let growthRate = null;
        if (previousPopulation !== null && previousPopulation > 0) {
          growthRate =
            ((totalPopulation - previousPopulation) / previousPopulation) * 100;
          growthRate = parseFloat(growthRate.toFixed(2)); // Bulatkan ke 2 desimal
        }

        setStats({
          totalPopulation,
          previousPopulation,
          menCount,
          womenCount,
          averageAge,
          populationDensity,
          growthRate,
          activeProducts,
        });
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, []);

  return stats;
}
