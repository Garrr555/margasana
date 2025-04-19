import AdminLayout from "@/components/layouts/AdminLayout";
import productServices from "@/services/product";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  nama: string;
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women"; // Hanya bisa bernilai "men" atau "women"
  status: string; // Status aktif atau tidak
}

export default function PieChart({ nama }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products)

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

  // Hitung jumlah penduduk berdasarkan jenis kelamin
  const menCount = activeProducts.filter((p) => p.category === "men").length;
  const womenCount = activeProducts.filter(
    (p) => p.category === "women"
  ).length;

  const data = {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [
      {
        data: [menCount, womenCount],
        backgroundColor: ["#3b82f6", "#ef4444"], // Biru untuk laki-laki, Merah untuk perempuan
        hoverOffset: 10,
      },
    ],
  };

  // Opsi untuk mengatur ukuran chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Agar bisa dikustomisasi ukurannya
  };

  return (
   
      
        <div className="bg-secondary shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-accent text-center mb-4">{`${nama}`}</h2>
          <div className="w-full h-96 mx-auto">
            <Pie data={data} options={options} />
          </div>
        </div>
      
    
  );
}
