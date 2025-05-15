"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropsType = {
  products: Product[];
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

interface User {
  fullname: string;
  email: string;
  phone: string;
  role: string;
}

export default function ProductsAdminView(props: PropsType) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, setToaster } = props;
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});
  console.log(productsData);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminLayout>
        <div>
          <div className="my-5 flex justify-between items-center">
            <h1 className="text-accent text-3xl font-semibold mb-2">
              Resident Management
            </h1>
            <Button
              type="button"
              textcolor="text-primary"
              bgcolor="bg-accent rounded-xl"
              onClick={() => setModalAddProduct(true)}
              icon={<FaPlus />}
            >
              {" "}
              Add People
            </Button>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            className="mb-4 p-2 rounded-xl w-full bg-secondary outline-none focus:outline-accent focus:ring-2 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="w-full border-2 border-gray-900">
            <thead>
              <tr className="bg-gray-900 ">
                <th
                  className="p-2 font-semibold border-r-2 border border-gray-800"
                  rowSpan={2}
                >
                  No
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Image
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Gender
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Status
                </th>
                {/* <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Income
                </th> */}
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Age
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Rt
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Rw
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Religion
                </th>
                {/* <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  NIK
                </th> */}
                <th
                  className="p-2 font-semibold border-l-2 border border-gray-800"
                  rowSpan={2}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-primary"}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="py-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={100}
                      width={100}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">
                    {product.status === "true" ? "Hidup" : "Meninggal"}
                  </td>
                  {/* <td className="text-center">
                    {convertIDR(product.price)}/month
                  </td> */}
                  <td className="text-center">{product.age}</td>
                  {/* <td className="text-center">
                    {product.date?.toLocaleString()}
                  </td> */}
                  <td className="text-center">
                    {product?.rt}
                  </td>
                  <td className="text-center">
                    {product?.rw}
                  </td>
                  <td className="text-center">
                    {product.religion && product.religion.trim() !== ""
                      ? product.religion
                      : "None"}
                  </td>
                  {/* <td className="text-center">
                    {product.nik ? product.nik : "None"}
                  </td> */}
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        textcolor="text-primary text-xl"
                        bgcolor="bg-accent"
                        onClick={() => setUpdatedProduct(product)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        type="button"
                        textcolor="text-white/80 text-xl"
                        bgcolor="bg-red-500"
                        onClick={() => setDeletedProduct(product)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
        />
      )}

      {Object.keys(updatedProduct).length && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}

      {Object.keys(deletedProduct).length && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
}
