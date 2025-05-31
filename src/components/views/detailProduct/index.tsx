"use client";

import Button from "@/components/ui/button";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
  refreshCart: () => void;
};

export default function DetailProductView(props: PropTypes) {
  const [selectedSize, setSelectedSize] = useState("");
  const { product, cart, productId, setToaster, refreshCart } = props;
  const { status, data: session }: any = useSession();
  const router = useRouter();

  console.log(status);
  console.log(selectedSize);
  console.log(product);

  return (
    <div className="container ">
      <div className="flex items-center w-full my-3 bg-secondary overflow-hidden rounded-lg ">
        <div className="w-[450px] xl:w-[600px] flex justify-start items-center">
          <Image
            src={product?.image}
            alt={product?.name}
            height={300}
            width={300}
            className="w-[450px] h-[450px] xl:w-[600px] xl:h-[600px]"
          />
        </div>
        <div className="w-1/2 h-[450px] xl:h-[600px] flex flex-col justify-between mx-auto py-6">
          <div className="flex flex-col gap-8 justify-center">
            <h1 className="text-4xl font-extrabold">{product?.name}</h1>
            <div className="grid gap-2">
              <div className="flex">
                <span className="min-w-[100px] font-light">RT/RW</span>
                <span className="text-third">
                  : {product?.rt} / {product?.rw}
                </span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Gender</span>
                <span className="text-third">: {product?.category}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Age</span>
                <span className="text-third">: {product?.age}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Date</span>
                <span className="text-third">: {product?.date}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Religion</span>
                <span className="text-third">: {product?.religion}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Marital</span>
                <span className="text-third">: {product?.martial}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Job</span>
                <span className="text-third">: {product?.job}</span>
              </div>
              <div className="flex">
                <span className="min-w-[100px] font-light">Income</span>
                <span className="text-third">: {product?.income}</span>
              </div>
            </div>
            <hr />
            <h3 className="text-xl text-accent font-bold">
              {product?.nik} - {product?.kk}
            </h3>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}
