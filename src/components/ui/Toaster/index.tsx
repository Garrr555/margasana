import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

type PropsTypes = {
  variant?: "success" | "error" | "warning";
  message?: string;
};

const toasterVariant = {
  success: {
    title: "Success",
    icon: <AiOutlineCheckCircle className="text-white text-3xl" />,
    bg: "bg-green-600",
    border: "border-green-400",
  },
  error: {
    title: "Error",
    icon: <AiOutlineCloseCircle className="text-white text-3xl" />,
    bg: "bg-red-600",
    border: "border-red-400",
  },
  warning: {
    title: "Warning",
    icon: <AiOutlineExclamationCircle className="text-white text-3xl" />,
    bg: "bg-yellow-600",
    border: "border-yellow-400",
  },
};

export default function Toaster({
  variant = "success",
  message = "Operation successful!",
}: PropsTypes) {
  const { title, icon, bg, border } = toasterVariant[variant];
  const [lengthBar, setLengthBar] = useState<any>(100);

  return (
    <div
      className={`fixed right-5 bottom-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white border-l-4 ${bg} ${border}`}
    >
      {icon}
      <div>
        <strong className="block">{title}</strong>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
