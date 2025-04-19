import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropsTypes = {
    product: Product
    
}
export default function Card(props: PropsTypes){
    const {product} = props
    return (
      <div className="bg-secondary flex justify-center items-center pb-2 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 group">
        <div className="w-[280px] h-[400px] xl:w-[300px] group-hover:scale-100 transition-all duration-300 ease-in-out">
          <div className="w-full h-3/4">
            <Image
              src={product.image}
              alt={product.name}
              height={300}
              width={300}
              className="w-full h-full "
            />
          </div>
          <div className="py-1 text-sm h-1/4 flex flex-col justify-between px-2">
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="font-light">{product.category}</p>
            </div>
            <br />
            <hr />
            <p className="font-extrabold text-accent text-end">
              {convertIDR(product.price)}
            </p>
          </div>
        </div>
      </div>
    );
}