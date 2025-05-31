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
      // price: parseInt(form.price.value),
      income: form.income.value,
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
      kk: form.kk.value,
      martial: form.martial.value,
      job: form.job.value,
      education: form.education.value,
      family: form.family.value,
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
        message: "Success to update person",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed to add person",
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
              message: "Failed to update person",
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
            placeholderreal="Insert Name"
            placeholder={updatedProduct.name}
          />
        </div>
        <Select
          label="Family Status"
          name="family"
          options={[
            { label: "Leader", value: "leader" },
            { label: "Member", value: "member" },
          ]}
          defaultValue={updatedProduct.family}
        />
        <Select
          label="Income"
          name="income"
          options={[
            { label: "Rp. 0 - Rp. 500.000", value: "Rp. 0 - Rp. 500.000" },
            {
              label: "Rp. 500.001 - Rp. 1.000.000",
              value: "Rp. 500.001 - Rp. 1.000.000",
            },
            {
              label: "Rp. 1.000.001 - Rp. 2.000.000",
              value: "Rp. 1.000.001 - Rp. 2.000.000",
            },
            {
              label: "Rp. 2.000.001 - Rp. 3.000.000",
              value: "Rp. 2.000.001 - Rp. 3.000.000",
            },
            {
              label: "Rp. 3.000.001 - Rp. 5.000.000",
              value: "Rp. 3.000.001 - Rp. 5.000.000",
            },
            {
              label: "Rp. 5.000.001 - Rp. 10.000.000",
              value: "Rp. 5.000.001 - Rp. 10.000.000",
            },
            {
              label: "Lebih dari Rp. 10.000.000",
              value: "Lebih dari Rp. 10.000.000",
            },
            { label: "Tidak Berpenghasilan", value: "Tidak Berpenghasilan" },
          ]}
          defaultValue={updatedProduct.income}
        />

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
          defaultValue={updatedProduct.religion}
        />
        <Select
          label="Last Education"
          name="education"
          options={[
            { label: "Tidak Sekolah", value: "Tidak Sekolah" },
            { label: "SD/Sederajat", value: "SD/Sederajat" },
            { label: "SMP/Sederajat", value: "SMP/Sederajat" },
            { label: "SMA/Sederajat", value: "SMA/Sederajat" },
            { label: "Diploma/S1/S2/S3", value: "Diploma/S1/S2/S3" },
          ]}
          defaultValue={updatedProduct.education}
        />
        <Select
          label="Martial Status"
          name="martial"
          options={[
            { label: "singel", value: "singel" },
            { label: "married", value: "married" },
            { label: "divorced", value: "divorced" },
            { label: "widowed", value: "widowed" },
          ]}
          defaultValue={updatedProduct.martial}
        />
        <Select
          label="Job"
          name="job"
          options={[
            { label: "Pegawai Negeri Sipil (PNS)", value: "pns" },
            { label: "Pegawai Swasta", value: "swasta" },
            { label: "Wiraswasta", value: "wiraswasta" },
            { label: "Petani", value: "petani" },
            { label: "Nelayan", value: "nelayan" },
            { label: "Buruh", value: "buruh" },
            { label: "Pedagang", value: "pedagang" },
            { label: "Guru", value: "guru" },
            { label: "Dokter", value: "dokter" },
            { label: "Mahasiswa/Pelajar", value: "mahasiswa" },
            { label: "Ibu Rumah Tangga", value: "irt" },
            { label: "Tidak Bekerja", value: "tidak_bekerja" },
            { label: "Pensiunan", value: "pensiunan" },
            { label: "Lainnya", value: "lainnya" },
          ]}
          defaultValue={updatedProduct.job}
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
            label="Nomor KK"
            name="kk"
            type="number"
            placeholderreal="Insert No KK"
            placeholder={updatedProduct.kk}
          />
        </div>
        <div className="flex gap-4 justify-between w-full items-center">
          <div className="w-1/2">
            <Select
              label="Rt"
              name="rt"
              options={[
                { label: "01", value: 1 },
                { label: "02", value: 2 },
                { label: "03", value: 3 },
                { label: "04", value: 4 },
              ]}
              defaultValue={updatedProduct.rt}
            />
          </div>
          <div className="w-1/2">
            <Select
              label="Rw"
              name="rw"
              options={[
                { label: "01", value: 1 },
                { label: "02", value: 2 },
                { label: "03", value: 3 },
              ]}
              defaultValue={updatedProduct.rw}
            />
          </div>
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
