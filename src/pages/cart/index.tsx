import MemberLayout from "@/components/layouts/MemberLayout";
import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

export default function CartPage(props: PropTypes) {

    const [cart, setCart] = useState([]);
     const [products, setProducts] = useState([]);
    const session: any = useSession();
    const {setToaster} = props

    const getCart = async (token: string) => {
        const {data} = await userServices.getCart(token);
        setCart(data.data)
    }

    useEffect(() => {
      const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts();
        setProducts(data.data);
      };
      getAllProducts();
    }, []);

    useEffect(() => {
        if(session.data?.accessToken){
            getCart(session.data?.accessToken);
        }
    }, [session]);

    console.log(cart)

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      
        <div className="container">
          <CartView cart={cart} products={products} />
        </div>
      
    </>
  );
}
