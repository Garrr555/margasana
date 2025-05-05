'use client'

import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ProductPage() {
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
        <title>Resident</title>
      </Head>
      <ProductView products={products}/>
    </>
  );
}
