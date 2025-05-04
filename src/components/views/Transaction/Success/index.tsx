import Button from "@/components/ui/button";
import { useRouter } from "next/router";

export default function SuccessView() {

  const {push} = useRouter();

  return (
    <div className=" h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-5xl font-bold">Payment Success</p>
      <div>
        <Button
          type="button"
          bgcolor="bg-accent rounded-xl"
          textcolor="text-secondary"
          onClick={() => push('/member/orders')}
        >
          Check Your Order Here
        </Button>
      </div>
    </div>
  );
}
