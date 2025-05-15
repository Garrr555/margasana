import AdminLayout from "@/components/layouts/AdminLayout";
import StatAdminView from "@/components/views/admin/stat";
import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AdminStatPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);
  console.log(products);

  return (
    <>
      <Head>
        <title>Residents</title>
      </Head>
      <AdminLayout>
        <ProductView products={products} />
      </AdminLayout>
    </>
  );
}
