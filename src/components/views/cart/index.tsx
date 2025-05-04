import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/Select";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function CartView(props: PropTypes) {
  const { setToaster } = props;
  const session: any = useSession();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);

  console.log(session.data?.accessToken);
  console.log(cart);
  console.log(products);

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  console.log(cart);

  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => product.id === id);
    console.log(product?.stock);

    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    const data = options?.filter((option) => option !== undefined);
    console.log(data);
    return data;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };
  console.log(getTotalPrice());

  const handleDeletreCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });
    try {
      const result = await userServices.addToCart(
        {
          carts: newCart,
        },
        session.data?.accessToken
      );
      if (result.status === 200) {
        setCart(newCart);
        setToaster({ message: "Success Item deleted", type: "success" });
      }
    } catch (error) {
      setToaster({ message: "Failed Item deleted", type: "error" });
    }

    console.log(newCart);
  };

  return (
    <div className="w-full flex gap-1 justify-center my-5">
      <div className="w-4/6 px-2">
        <Link href="/products"><h1 className="text-4xl font-bold">Cart</h1></Link>
        {cart.length > 0 ? (
          <div>
            {cart.map((item: { id: string; size: string; qty: number }) => (
              <Fragment key={`${item.id}-${item.size}`}>
                <div className="flex items-start w-full justify-between bg-secondary rounded-xl overflow-hidden">
                  <div className=" flex gap-5 h-[150px]">
                    <Image
                      src={`${getProduct(item.id)?.image}`}
                      width={150}
                      height={150}
                      alt={`${item.id}-${item.size}`}
                      className="min-w-[150px] h-[150px]"
                    />
                    <div className="py-2 flex flex-col items-start justify-between">
                      <p className="text-lg font-bold">
                        {getProduct(item.id)?.name}
                      </p>
                      <p className="text-md font-light">
                        {getProduct(item.id)?.category}
                      </p>

                      <div className="flex items-center gap-2">
                        <label className="text-md font-light flex items-center gap-2">
                          size
                          <Select
                            name="size"
                            options={getOptionsSize(item.id, item.size)}
                            disable={true}
                          ></Select>
                        </label>
                        <div className="text-accent">
                          <p>|</p>
                          <p className="-my-3">|</p>
                          <p>|</p>
                        </div>
                        <label className="text-md font-light flex items-center gap-2">
                          Quantity
                          <Input
                            name="qty"
                            type="number"
                            className="w-[50px]"
                            placeholder={item.qty}
                            disable={true}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-md text-accent p-2 h-[150px] flex flex-col justify-between items-end">
                    {item.qty > 1 ? (
                      <div className="flex flex-col items-end">
                        <div className="text-gray-500 line-through ">
                          {convertIDR(getProduct(item.id)?.price)}
                        </div>
                        <div className="text-lg">
                          {convertIDR(
                            (getProduct(item.id)?.price || 0) * item.qty
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-lg">
                        {convertIDR(getProduct(item.id)?.price)}
                      </div>
                    )}
                    <Button
                      type="button"
                      textcolor="text-red-500 text-xl"
                      bgcolor="rounded-lg"
                      onClick={() => handleDeletreCart(item.id, item.size)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
                <div className="my-10 ">
                  <hr className="" />
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/30 text-7xl h-full flex items-center justify-center">
            Cart Empety
          </div>
        )}
      </div>
      <div className="w-2/6 sticky h-fit top-5">
        <h1 className="text-3xl font-extrabold mb-5">Summary</h1>
        <div className="bg-secondary rounded-lg h-[430px] p-4 w-full flex flex-col justify-between">
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex items-center justify-between">
              <p>Subtotal:</p>
              <p className="">{convertIDR(getTotalPrice())}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Delivery:</p>
              <p className="">{convertIDR(0)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tax: (10%)</p>
              <p className="">{convertIDR(getTotalPrice() * 0.1)}</p>
            </div>
          </div>
          <div className="w-full">
            <div>
              <hr className="my-4" />
              <div className="flex items-center justify-between">
                <p>Total:</p>
                <p className="text-accent text-lg font-bold">
                  {convertIDR(getTotalPrice() * 1.1)}
                </p>
              </div>
              <hr className="my-4" />
            </div>
            <Link href={"/checkout"}>
              <Button
                type="button"
                textcolor="text-primary"
                bgcolor="bg-accent rounded-full w-full"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
