"use client";

import Modal from "@/components/ui/modal";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type PropTypes = {
  setDetailOrders: Dispatch<SetStateAction<{}>>;
  detailOrders: any;
  products: Product[];
};

export default function ModalDetailOrder(props: PropTypes) {
  const { setDetailOrders, detailOrders, products } = props;
  console.log(detailOrders);
  console.log(products);

  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };

  return (
    <Modal onClose={() => setDetailOrders({})}>
      <div className="flex flex-col justify-center gap-8">
        <h1 className="text-2xl font-semibold my-5 text-accent">
          Detail Order
        </h1>
        <div className="">
          <p className="font-semibold text-xl mb-2">Data Order</p>
          <div className="flex justify-between gap-2">
            <div className="">
              <p className="text-md">Order ID</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.order_id}
              </p>
            </div>
            <div className="">
              <p className="text-md">Total</p>
              <p className="text-[12px] font-extralight">
                {convertIDR(detailOrders?.total)}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-md">Status</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.status}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="">
          <p className="font-semibold text-xl mb-2">Data Recipient</p>
          <div className="flex flex-wrap justify-between gap-2 w-full">
            <div className="w-1/3">
              <p className="text-md">Name</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.address.recipient}
              </p>
            </div>
            <div className="">
              <p className="text-md">Phone</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.address.phone}
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-md">Notes</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.address.note}
              </p>
            </div>
            <div className="w-2/3">
              <p className="text-md">Address Line</p>
              <p className="text-[12px] font-extralight">
                {detailOrders?.address.addressLine}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p className="font-semibold text-xl mb-2">Data Product</p>
          <div className="border border-white/80 rounded-xl p-4 flex flex-col gap-4">
            {detailOrders?.items?.map(
              (item: { id: string; size: string; qty: number }) => (
                <Fragment key={`${item.id}-${item.size}`}>
                  <div className="flex items-start w-full h-[100px] justify-between bg-secondary rounded-xl overflow-hidden">
                    <div className=" flex gap-5">
                      <Image
                        src={`${getProduct(item.id)?.image}`}
                        width={100}
                        height={100}
                        alt={`${item.id}-${item.size}`}
                        className="min-w-[100px] h-[100px]"
                      />
                      <div className="py-2 flex flex-col items-start justify-between">
                        <p className="text-lg font-bold">
                          {getProduct(item.id)?.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <label className="text-md font-light flex items-center gap-2">
                            size{" "}
                            <span className="text-accent">{item.size}</span>
                          </label>
                          <div className="text-accent">
                            <p>|</p>
                            <p className="-my-3">|</p>
                            <p>|</p>
                          </div>
                          <label className="text-md font-light flex items-center gap-2">
                            Quantity{" "}
                            <span className="text-accent">{item.qty}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-md text-accent p-2 h-[150px] flex flex-col justify-between items-end">
                      {item.qty > 1 ? (
                        <div className="flex flex-col items-end">
                          <div className="text-gray-500 line-through ">
                            {convertIDR(getProduct(item.id)?.price)}
                          </div>
                          <div className="text-lg">
                            {convertIDR(
                              (getProduct(item.id)?.price || 0) * item.qty
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-lg">
                          {convertIDR(getProduct(item.id)?.price)}
                        </div>
                      )}
                    </div>
                  </div>
                </Fragment>
              )
            )}
          </div>
        </div>
        {/* <Button
        type={"button"}
        onClick={() => {}}
        textcolor={"text-white mb-5"}
        bgcolor={"bg-red-500"}
      >
        Delete
      </Button> */}
      </div>
    </Modal>
  );
}
