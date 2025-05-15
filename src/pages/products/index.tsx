"use client";

import StatAdminView from "@/components/views/admin/stat";
import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ProductPage() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     const { data } = await productServices.getAllProducts();
  //     setProducts(data.data);
  //   };
  //   getAllProducts();
  // }, []);
  // console.log(products);
  return (
    <>
      <Head>
        <title>Statistic</title>
      </Head>
      {/* <ProductView products={products}/> */}
      <div className="container">
        <StatAdminView />
      </div>
    </>
  );
}
