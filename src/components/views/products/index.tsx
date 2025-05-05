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

  const filteredProducts = products.filter((product) => {
    const matchStatus = product.status === "true";

    const matchGender =
      selectedGenders.length === 0 ||
      selectedGenders.includes(product.category.toLowerCase());

    const matchMinPrice = minPrice === null || product.price >= minPrice;
    const matchMaxPrice = maxPrice === null || product.price <= maxPrice;

    const matchSearchQuery =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchStatus &&
      matchGender &&
      matchMinPrice &&
      matchMaxPrice &&
      matchSearchQuery
    );
  });

  const resetFilters = () => {
    setSelectedGenders([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSearchQuery("");
  };

  return (
    <div className="container mb-5 ">
      <div className="mt-3 w-full bg-primary flex flex-col items-end sticky h-fit top-20 right-0 xl:top-28 z-10 pb-4">
        <Input
          type="text"
          placeholder="Search"
          name="search"
          className="border border-white/80 rounded-xl bg-secondary"
          placeholderreal="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-5 flex gap-8">
        <div className="w-1/6 xl:w-[10%] fixed overflow-hidden top-20 z-20 xl:top-28">
          <p className="text-xl">
            People{" "}
            <span className="text-accent">({filteredProducts.length})</span>
          </p>
          <h4 className="font-semibold mt-8 mb-3">Gender</h4>
          <div className="flex flex-col justify-center gap-3">
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
            // <Link key={product.id} href={`/products/${product.id}`}>
            <div key={product.id}>
              <Card product={product} />
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
