import { useEffect, useState } from "react";
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
    bg: "bg-secondary",
    border: "border-secondary",
    progress: "bg-accent",
  },
  error: {
    title: "Error",
    icon: <AiOutlineCloseCircle className="text-red-500 text-3xl" />,
    bg: "bg-secondary",
    border: "bg-secondary",
    progress: "bg-red-400",
  },
  warning: {
    title: "Warning",
    icon: <AiOutlineExclamationCircle className="text-yellow-500 text-3xl" />,
    bg: "bg-secondary",
    border: "bg-secondary",
    progress: "bg-yellow-400",
  },
};

export default function Toaster({
  variant = "success",
  message = "Operation successful!",
}: PropsTypes) {
  const { title, icon, bg, border, progress } = toasterVariant[variant];
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);

    const enterTimeout = setTimeout(() => {
      setShow(true);
    }, 50);

    const exitTimeout = setTimeout(() => {
      setShow(false);
    }, 3000); // 3 detik durasi

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed right-5 bottom-5 z-[9999] flex flex-col gap-2 w-72 rounded-lg shadow-lg text-white border-l-4 transform transition-all duration-500
        ${bg} ${border}
        ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {icon}
        <div>
          <strong className="block">{title}</strong>
          <span className="text-sm">{message}</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className={`relative w-full h-1 ${progress} overflow-hidden rounded-b-lg`}>
        <div
          className={`absolute left-0 top-0 h-full bg-primary bg-opacity-30 transition-all duration-[3000ms]`}
          style={{
            width: show ? "100%" : "0%", // start at 100%, shrink to 0%
          }}
        ></div>
      </div>
    </div>
  );
}
