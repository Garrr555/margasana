import CheckoutView from "@/components/views/checkout";
import Head from "next/head";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function CheckoutPage(props: PropTypes) {
  const { setToaster } = props;
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <div className="container">
        <CheckoutView setToaster={setToaster} />
      </div>
    </>
  );
}
