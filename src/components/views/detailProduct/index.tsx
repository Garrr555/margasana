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

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            size: selectedSize,
            qty: 1,
          },
        ];
      }
      try {
        const result = await userServices.addToCart(
          {
            carts: newCart,
          },
          session?.accessToken
        );
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({ variant: "success", message: "Success to add to cart" });
          props.refreshCart();
        }
      } catch (error) {
        setToaster({ variant: "error", message: "Failed to add to cart" });
      }
      console.log(newCart);
    }
  };
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
        <div className="w-1/2 h-[450px] xl:h-[600px] flex flex-col justify-between mx-auto py-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold">{product?.name}</h1>
            <br />
            <h3 className="text-xl font-extralight text-white/80">
              Gender: {product?.category}
            </h3>
            <h3 className="text-xl font-extralight text-white/80">
              Age: {product?.age}
            </h3>
            <h3 className="text-xl font-extralight text-white/80">
              Date: {product?.date}
            </h3>
            <h3 className="text-xl font-extralight text-white/80">
              Religion: {product?.religion}
            </h3>
            <h3 className="text-xl font-extralight text-white/80">
              Income: {convertIDR(product?.price)}
            </h3>
            <h3 className="text-xl font-extralight text-white/80">
              Rt: {product?.rt} Rw: {product?.rw}
            </h3>
            <br />
            <h3 className="text-xl text-accent font-bold">{product?.nik}</h3>
          </div>
          {/* <div>
            <p className="font-light text-sm">Select Size</p>
            <div className="w-full grid grid-cols-3 xl:grid-cols-4 gap-2 my-3">
              {product?.stock?.map(
                (item: { size: string; qty: number | string }, i: number) => {
                  const isDisabled = item.qty === 0 || item.qty === "0";

                  return (
                    <div key={i}>
                      {isDisabled ? (
                        <div
                          className="border px-4 py-2 rounded-md text-sm opacity-50
                         cursor-not-allowed select-none flex items-center justify-center min-w-[48px] min-h-[40px]"
                          title="Stok habis"
                        >
                          {item.size}
                        </div>
                      ) : (
                        <>
                          <input
                            type="radio"
                            id={`size-${item.size}`}
                            name="size"
                            className="hidden peer"
                            onClick={() => setSelectedSize(item.size)}
                            checked={selectedSize === item.size}
                          />
                          <label
                            htmlFor={`size-${item.size}`}
                            className="border border-white/80 px-4 py-2 rounded-md text-sm
                           cursor-pointer select-none flex items-center justify-center
                           peer-checked:border-accent peer-checked:bg-transparent peer-checked:text-accent
                           min-w-[48px] min-h-[40px] hover:bg-primary transition-all duration-300 ease-in-out"
                          >
                            {item.size}
                          </label>
                        </>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div> */}
          <div className="w-full">
            {/* <Button
              type={status === "authenticated" ? "submit" : "button"}
              bgcolor="bg-accent rounded-lg w-full"
              textcolor="text-primary text-2xl"
              onClick={() => {
                status === "unauthenticated"
                  ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                  : handleAddToCart();
              }}
            >
              {<FaCartPlus />} <span className="text-xl">add to cart</span>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
