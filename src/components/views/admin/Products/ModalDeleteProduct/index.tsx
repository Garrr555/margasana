"use client";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";

type PropTypes = {
  setProductsData: React.Dispatch<React.SetStateAction<Product[]>>;
  setDeletedProduct: React.Dispatch<React.SetStateAction<{}>>;
  deletedProduct: Product | any;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function ModalDeleteProduct(props: PropTypes) {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log("nama: ", setProductsData);

  console.log(deletedProduct);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      deleteFile(
        `/images/Products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setIsLoading(false);
            setDeletedProduct({});
            const { data } = await productServices.getAllProducts();
            setProductsData(data.data);
            setToaster({
              variant: "success",
              message: "Success to delete product",
            });
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed to delete product",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct(false)}>
      <h1 className="text-2xl font-semibold my-5">
        Delete{" "}
        <span className="text-accent text-3xl font-bold">
          {deletedProduct.name}
        </span>{" "}
        ?
      </h1>
      <Button
        type={"button"}
        onClick={() => handleDelete()}
        textcolor={"text-white mb-5"}
        bgcolor={"bg-red-500 rounded-lg"}
      >
        Delete
      </Button>
    </Modal>
  );
}
