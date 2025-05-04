import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/Select";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ModalChangeAddress from "./ModalChangeAddress";
import Script from "next/script";
import transactionServices from "@/services/transaction";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function CheckoutView(props: PropTypes) {
  const { setToaster } = props;
  const session: any = useSession();
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);
  const token = session.data?.accessToken;

  console.log(token);
  console.log(profile);
  console.log(products);


  const getProfile = async (token: string) => {
    const { data } = await userServices.getProfile(token);
    setProfile(data.data);
    if (data.data.address && data.data.address.length > 0) {
      data.data.address.forEach((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  console.log(selectedAddress);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile(session.data?.accessToken);
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };

  const getSubTotalPrice = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
    
  };

  const getTotalPrice = () => {
    const subtotal = getSubTotalPrice();
    const tax = subtotal * 0.1;
    return subtotal + tax;
  };
  console.log(getTotalPrice());
  console.log(profile.address)

  const handleCheckout = async () => {
    const payload = {
      user: {
        fullname: profile.fullname,
        email: profile.email,
        address: profile.address[selectedAddress],
      },
      transaction: {
        items: profile.carts,
        total: getTotalPrice(),
      }
    }
    const { data } = await transactionServices.generatedTransaction(
      payload,
      session.data?.accessToken
    );
    window.snap.pay(data.data.token);
  }

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="w-full flex gap-1 justify-center my-5">
        <div className="w-4/6 px-2">
          <h1 className="text-3xl font-extrabold mb-5">Cart</h1>
          <div className="bg-secondary my-5 p-3 rounded-xl border border-white/80">
            <p className="text-lg font-bold mb-3 text-accent">
              Shipping Address
            </p>
            {profile?.address?.length > 0 ? (
              <div>
                {profile?.address?.length > 0 &&
                  profile?.address[selectedAddress] && (
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">
                        {profile.address[selectedAddress].recipient} -{" "}
                        {profile.address[selectedAddress].phone}
                      </p>
                      <p>{profile.address[selectedAddress].addressLine}</p>
                      <p className="mb-5">
                        Note: {profile.address[selectedAddress].note}
                      </p>
                      <Button
                        type="button"
                        bgcolor="bg-accent rounded-lg"
                        textcolor="text-primary"
                        onClick={() => setChangeAddress(true)}
                      >
                        Change
                      </Button>
                    </div>
                  )}
              </div>
            ) : (
              <div className="">
                <div className="bg-primary rounded-lg p-10 my-4">
                  <p className="text-center text-white/80">No Data</p>
                </div>
                <Button
                  type="button"
                  bgcolor="bg-accent rounded-lg w-full"
                  textcolor="text-primary"
                  onClick={() => setChangeAddress(true)}
                >
                  Add New Address
                </Button>
              </div>
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className="border border-white/80 rounded-xl p-4">
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className="flex items-start w-full h-[100px] justify-between bg-secondary rounded-xl overflow-hidden ">
                      <div className=" flex gap-5">
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          width={100}
                          height={100}
                          alt={`${item.id}-${item.size}`}
                          className="min-w-[100px] h-[100px]"
                        />
                        <div className="py-2 flex flex-col items-start justify-between">
                          <p className="text-lg font-bold">
                            {getProduct(item.id)?.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <label className="text-md font-light flex items-center gap-2">
                              size{" "}
                              <span className="text-accent">{item.size}</span>
                            </label>
                            <div className="text-accent">
                              <p>|</p>
                              <p className="-my-3">|</p>
                              <p>|</p>
                            </div>
                            <label className="text-md font-light flex items-center gap-2">
                              Quantity{" "}
                              <span className="text-accent">{item.qty}</span>
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
                      </div>
                    </div>
                    <div className="my-10 ">
                      <hr className="" />
                    </div>
                  </Fragment>
                )
              )}
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
                <p className="">{convertIDR(getSubTotalPrice())}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Delivery:</p>
                <p className="">{convertIDR(0)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tax: (10%)</p>
                <p className="">{convertIDR(getSubTotalPrice() * 0.1)}</p>
              </div>
            </div>
            <div className="w-full">
              <div>
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <p>Total:</p>
                  <p className="text-accent text-lg font-bold">
                    {convertIDR(getTotalPrice())}
                  </p>
                </div>
                <hr className="my-4" />
              </div>
              <Button
                type="button"
                textcolor="text-primary"
                bgcolor="bg-accent rounded-full w-full"
                onClick={() => handleCheckout()}
              >
                Process Payment
              </Button>
            </div>
          </div>
        </div>

        {changeAddress && (
          <ModalChangeAddress
            profile={profile}
            setChangeAddress={setChangeAddress}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            setToaster={setToaster}
            setProfile={setProfile}
          />
        )}
      </div>
    </>
  );
}
