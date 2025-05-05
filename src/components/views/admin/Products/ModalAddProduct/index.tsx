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
  setModalAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsData: React.Dispatch<React.SetStateAction<Product[]>>;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function ModalAddProduct(props: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { setModalAddProduct, setProductsData, setToaster } = props;
  const session: any = useSession();

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main" + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "Products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success to add product",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "error",
                message: "Failed to add product",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "error",
              message: "Failed to add product",
            });
          }
        }
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const stock = stockCount.map((stock) => {
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
      stock: stock,
      age: form.age.value,
      religion: form.religion.value,
      nik: form.nik.value,
      date: form.date.value,
      image: "",
    };

    console.log(data);

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="text-2xl text-accent font-semibold">Add People</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholderreal="Insert Name"
          />
        </div>
        <div className="my-4">
          <Input
            label="Income"
            name="price"
            type="number"
            placeholderreal="Insert Income"
          />
        </div>

        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={""}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Hidup", value: "true" },
            { label: "Meninggal", value: "false" },
          ]}
          defaultValue={""}
        />
        <div className="my-4">
          <Input
            label="Age"
            name="age"
            type="number"
            placeholderreal="Insert Age"
          />
        </div>
        <div className="my-4">
          <Input
            label="Date"
            name="date"
            type="date"
            placeholderreal="Insert Date"
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
          />
        </div>
        <label htmlFor="image">Image</label>
        <div className="flex items-center justify-center gap-5 mb-5 w-full">
          {uploadedImage ? (
            <Image
              src={URL.createObjectURL(uploadedImage)}
              width={100}
              height={100}
              alt="image"
              className="w-[25%]"
            />
          ) : (
            <div className="w-[25%] bg-primary h-40 flex justify-center items-center rounded-xl border border-accent">
              No Image
            </div>
          )}

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
            {isLoading ? "Loading..." : "Add People"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
