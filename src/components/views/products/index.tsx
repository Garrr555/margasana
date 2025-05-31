"use client";

import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Card from "./card";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

type PropsTypes = {
  products: Product[];
};

export default function ProductView(props: PropsTypes) {
  const { products } = props;
  console.log(products);

  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handleReligionChange = (religion: string) => {
    setSelectedReligions((prev) =>
      prev.includes(religion)
        ? prev.filter((r) => r !== religion)
        : [...prev, religion]
    );
  };

  const filteredProducts = products.filter((product: any) => {
    const matchStatus = product.status === "true";

    const matchGender =
      selectedGenders.length === 0 ||
      selectedGenders.includes(product.category?.toLowerCase());

    const matchReligion =
      selectedReligions.length === 0 ||
      selectedReligions.includes(product.religion?.toLowerCase());

    const matchMinPrice = minPrice === null || product.price >= minPrice;
    const matchMaxPrice = maxPrice === null || product.price <= maxPrice;

    const matchSearchQuery =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nik?.includes(searchQuery.toLowerCase()) ||
      product.kk?.includes(searchQuery.toLowerCase());

    return (
      matchStatus &&
      matchGender &&
      matchMinPrice &&
      matchMaxPrice &&
      matchSearchQuery &&
      matchReligion
    );
  });

  const resetFilters = () => {
    setSelectedGenders([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSearchQuery("");
  };

  return (
    <div className=" mb-5 ">
      <div className=" w-full bg-primary flex flex-col items-end sticky h-20 top-0 right-0 z-10 pb-4">
        <br />
        <Input
          type="text"
          placeholder="Search"
          name="search"
          className="border border-third rounded-xl bg-secondary"
          placeholderreal="Search Name or NIK or KK"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <br />
      </div>
      <div className="mt-5 flex gap-8 container">
        <div className="w-1/6 xl:w-[10%] fixed overflow-hidden top-10 z-20">
          <p className="text-xl">
            People{" "}
            <span className="text-accent">({filteredProducts.length})</span>
          </p>
          <div className="flex flex-col justify-center gap-3">
            <h4 className="font-semibold mt-2 text-accent">Gender</h4>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="men"
                className=""
                checked={selectedGenders.includes("men")}
                onChange={() => handleGenderChange("men")}
              />
              <label htmlFor="men">Men</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="women"
                checked={selectedGenders.includes("women")}
                onChange={() => handleGenderChange("women")}
              />
              <label htmlFor="women">Women</label>
            </div>
            <hr />
            <h4 className="font-semibold mt-2 text-accent">Religion</h4>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="islam"
                className=""
                checked={selectedReligions.includes("islam")}
                onChange={() => handleReligionChange("islam")}
              />
              <label htmlFor="islam">Islam</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="kristen"
                checked={selectedReligions.includes("kristen")}
                onChange={() => handleReligionChange("kristen")}
              />
              <label htmlFor="kristen">Kristen</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="katolik"
                className=""
                checked={selectedReligions.includes("katolik")}
                onChange={() => handleReligionChange("katolik")}
              />
              <label htmlFor="katolik">Katolik</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="hindu"
                checked={selectedReligions.includes("hindu")}
                onChange={() => handleReligionChange("hindu")}
              />
              <label htmlFor="hindu">Hindu</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="buddha"
                className=""
                checked={selectedReligions.includes("buddha")}
                onChange={() => handleReligionChange("buddha")}
              />
              <label htmlFor="buddha">Buddha</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="konghucu"
                checked={selectedReligions.includes("konghucu")}
                onChange={() => handleReligionChange("konghucu")}
              />
              <label htmlFor="konghucu">Konghucu</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="ateis"
                className=""
                checked={selectedReligions.includes("ateis")}
                onChange={() => handleReligionChange("ateis")}
              />
              <label htmlFor="ateis">Ateis</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input
                type="checkbox"
                id="none"
                checked={selectedReligions.includes("")}
                onChange={() => handleReligionChange("")}
              />
              <label htmlFor="none">None</label>
            </div>
            <div className="mt-5 w-full">
              <Button
                onClick={resetFilters}
                type="button"
                bgcolor="bg-accent hover:bg-accent-hover rounded-xl"
                textcolor="text-secondary"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </div>
        <div className="w-5/6 xl:xl:w-[90%] grid grid-cols-3 xl:grid-cols-4 gap-4 ml-48 xl:ml-64">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div key={product.id}>
                <Card product={product} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
