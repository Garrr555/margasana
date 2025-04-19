'use client'

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
};

export default function ModalDeleteProduct(props: PropTypes) {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;
  const session:any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log("nama: ", setProductsData);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken,
    );
    if(result.status === 200){
        deleteFile(`/images/Products/${deletedProduct.id}/${deletedProduct.image.split("%2F")[3].split("?")[0]}`, async (status: boolean) => {
            if(status){
                setIsLoading(false);
                setDeletedProduct({});
                const { data } = await productServices.getAllProducts();
                setProductsData(data.data);
            }
        });
    } else{
        setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct(false)}>
      <h1 className="text-2xl font-semibold my-5">
        Delete Product ?
      </h1>
      <Button
        type={"button"}
        onClick={() => handleDelete()}
        textcolor={"text-white mb-5"}
        bgcolor={"bg-red-500"}
      >
        Delete
      </Button>
    </Modal>
  );
}
