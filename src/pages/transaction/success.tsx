import SuccessView from "@/components/views/Transaction/Success";
import transactionServices from "@/services/transaction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TransactionSuccessPage() {
  const { query, isReady } = useRouter();
  const { data: session, status }:any = useSession();
  const token = session?.accessToken;
  const order_id:any = query.order_id;
  console.log(token);
  console.log(order_id);
  const checkPayment = async () => {
    const { data } = await transactionServices.updateTransaction(
      order_id,
      token,
    );
    console.log(data);
  };
  useEffect(() => {
    if (isReady && status === "authenticated" && token && order_id) {
      checkPayment();
    }
  }, [isReady, status, token, order_id]);

  return (
    <div className="container">
      <SuccessView />
    </div>
  );
}
