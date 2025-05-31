import AdminLayout from "@/components/layouts/AdminLayout";
import productServices from "@/services/product";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  nama: string;
  parameter: "kelamin" | "agama" | "status" | "pendidikan";
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  religion: string;
  status: string;
  martial: string;
  education: string;
}

export default function PieChart({ nama, parameter }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

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

  console.log(activeProducts);

  let labels: string[] = [];
  let counts: number[] = [];

  if (parameter === "kelamin") {
    const menCount = activeProducts.filter((p) => p.category === "men").length;
    const womenCount = activeProducts.filter(
      (p) => p.category === "women"
    ).length;

    labels = ["Laki-laki", "Perempuan"];
    counts = [menCount, womenCount];
  } else if (parameter === "agama") {
    const religionMap: Record<string, number> = {};

    activeProducts.forEach((product) => {
      const religion = product.religion || "Tidak Diketahui";
      religionMap[religion] = (religionMap[religion] || 0) + 1;
    });

    labels = Object.keys(religionMap);
    counts = Object.values(religionMap);
  } else if (parameter === "status") {
    const statusMap: Record<string, number> = {};

    activeProducts.forEach((product) => {
      const status = product.martial || "Tidak Diketahui";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    labels = Object.keys(statusMap);
    counts = Object.values(statusMap);
  } else if (parameter === "pendidikan") {
    const educationMap: Record<string, number> = {};

    activeProducts.forEach((product) => {
      const education = product.education || "Tidak Diketahui";
      educationMap[education] = (educationMap[education] || 0) + 1;
    });

    labels = Object.keys(educationMap);
    counts = Object.values(educationMap);
  }

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
          "#00ff99",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-secondary p-6 w-full">
      <h2 className="text-xl font-semibold text-accent text-center mb-4">{`${nama}`}</h2>
      <div className="w-full h-96 mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
