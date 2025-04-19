import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Card from "./card";
import Link from "next/link";

type PropsTypes = {
  products: Product[];
};

export default function ProductView(props: PropsTypes) {
  const { products } = props;
  return (
    <div className="container mb-3">
      <div className="mt-5 flex gap-8">
        <div className="w-1/6 xl:w-[10%] fixed overflow-hidden ">
          <p className="text-xl">
            Product <span className="text-accent">({products.length})</span>
          </p>
          <h4 className="font-semibold mt-8 mb-3">Gender</h4>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex gap-2 xl:text-xl">
              <input type="checkbox" id="men" className="" />
              <label htmlFor="men">Men</label>
            </div>
            <div className="flex gap-2 xl:text-xl">
              <input type="checkbox" id="women" />
              <label htmlFor="women">Women</label>
            </div>
            <hr />
          </div>
        </div>
        <div className="w-5/6 xl:xl:w-[90%] grid grid-cols-3 xl:grid-cols-4 gap-4 ml-48 xl:ml-64">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
