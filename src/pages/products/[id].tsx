"use client";

import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function DetailProductPage(props: PropTypes) {
  const { setToaster } = props;
  const [product, setProduct] = useState<Product | {}>([]);
  const [cart, setCart] = useState([]);
  const { id } = useRouter().query;
  const session: any = useSession();

  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);

    setProduct(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  console.log(product);
  return (
    <>
      <Head>
        <title>Products Detail</title>
      </Head>
      <DetailProductView
        product={product}
        cart={cart}
        productId={id}
        setToaster={setToaster}
        refreshCart={() => getCart(session.data?.accessToken)}
      />
    </>
  );
}
