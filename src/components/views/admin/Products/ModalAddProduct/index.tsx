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

  // const handleStock = (e: any, i: number, type: string) => {
  //   const newStockCount: any = [...stockCount];
  //   newStockCount[i][type] = e.target.value;
  //   setStockCount(newStockCount);
  // };

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
                message: "Success to add person",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "error",
                message: "Failed to add person",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "error",
              message: "Failed to add person",
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
      income: form.income.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      age: form.age.value,
      religion: form.religion.value,
      nik: form.nik.value,
      date: form.date.value,
      image: "",
      rt: form.rt.value,
      rw: form.rw.value,
      kk: form.kk.value,
      martial: form.martial.value,
      job: form.job.value,
      education: form.education.value,
      family: form.family.value,
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
        <Select
          label="Family Status"
          name="family"
          options={[
            { label: "Leader", value: "leader" },
            { label: "Member", value: "member" },
          ]}
          defaultValue={" "}
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
          defaultValue={" "}
        />
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
          defaultValue={" "}
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
          defaultValue={" "}
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
        <div className="my-4">
          <Input
            label="Nomor KK"
            name="kk"
            type="number"
            placeholderreal="Insert No KK"
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
              defaultValue={" "}
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
              defaultValue={" "}
            />
          </div>
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
