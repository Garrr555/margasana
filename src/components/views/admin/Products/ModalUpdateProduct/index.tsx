"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";

type PropsType = {
  updatedProduct: Product | any;
  setUpdatedProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsData: React.Dispatch<React.SetStateAction<Product[]>>;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function ModalUpdateProduct(props: PropsType) {
  const { updatedProduct, setUpdatedProduct, setProductsData, setToaster } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const stock = stockCount.map((stock: { size: string; qty: number }) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      category: form.category.value,
      status: form.status.value,
      age: form.age.value,
      date: form.date.value,
      nik: form.nik.value,
      religion: form.religion.value,
      stock: stock,
      image: newImageURL,
      rt: form.rt.value,
      rw: form.rw.value,
    };
    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success to update product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed to add product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "Products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "error",
              message: "Failed to update product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className="text-2xl text-accent font-semibold">Edit People</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholderreal="Insert Product Name"
            placeholder={updatedProduct.name}
          />
        </div>
        <div className="my-4">
          <Input
            label="Price"
            name="price"
            type="number"
            placeholderreal="Insert Product Price"
            placeholder={updatedProduct.price}
          />
        </div>

        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct.category}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Hidup", value: "true" },
            { label: "Meninggal", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />
        <div className="my-4">
          <Input
            label="Age"
            name="age"
            type="number"
            placeholderreal="Insert Age"
            placeholder={updatedProduct.age}
          />
        </div>
        <div className="my-4">
          <Input
            label="Date"
            name="date"
            type="date"
            placeholderreal="Insert Age"
            placeholder={updatedProduct.date}
          />
        </div>
        <Select
          label="Religion"
          name="religion"
          options={[
            { label: "islam", value: "islam" },
            { label: "kristen", value: "kristen" },
            { label: "katolik", value: "katolik" },
            { label: "hindu", value: "hindu" },
            { label: "buddha", value: "buddha" },
            { label: "konghucu", value: "konghucu" },
            { label: "ateis", value: "ateis" },
            { label: "another", value: "another" },
          ]}
          defaultValue={" "}
        />
        <div className="my-4">
          <Input
            label="NIK"
            name="nik"
            type="number"
            placeholderreal="Insert NIK"
            placeholder={updatedProduct.nik}
          />
        </div>
        <div className="my-4">
          <Input
            label="Rt"
            name="rt"
            type="number"
            placeholderreal="Insert Rt"
            placeholder={updatedProduct.rt}
          />
        </div>
        <div className="my-4">
          <Input
            label="Rw"
            name="rw"
            type="number"
            placeholderreal="Insert Rw"
            placeholder={updatedProduct.rw}
          />
        </div>
        <label htmlFor="image">Image</label>
        <div className="flex items-center gap-5 mb-5 w-full">
          <Image
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            width={100}
            height={100}
            alt="image"
            className="w-[25%]"
          />

          <div className="w-[75%]">
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
        {/* <label htmlFor="stock" className="">
          Stock
        </label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div
            key={i}
            className="my-4 flex items-center justify-between gap-3 w-full"
          >
            <div className="w-[50%]">
              <Input
                name="size"
                type="text"
                label="Size"
                placeholderreal="Insert Product Size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
                placeholder={item.size}
              />
            </div>
            <div className="w-[50%]">
              <Input
                name="qty"
                type="number"
                label="QTY"
                placeholderreal="Insert Product Quantity"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
                placeholder={item.qty}
              />
            </div>
          </div>
        ))}
        <Button
          bgcolor={"bg-accent rounded-full"}
          textcolor={"text-primary"}
          type={"button"}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button> */}
        <div className="flex flex-col">
          <br />

          <Button
            bgcolor={"bg-accent rounded-full"}
            textcolor={"text-primary"}
            type={"submit"}
          >
            {isLoading ? "Loading..." : "Update People"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
