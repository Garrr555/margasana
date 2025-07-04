import Sidebar from "@/components/fragments/Sidebar";
import { listSideBarMember } from "@/data/sidebar";
import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

type PropsType = {
  children: React.ReactNode;
};

export default function MemberLayout(props: PropsType) {
  const { children } = props;
  const [button, setButton] = useState(false);

  const handleButton = () => {
    setButton(!button);
  };

  return (
    <div className="flex">
      <button
        className={`${
          button
            ? "-translate-x-52 bg-layout -mt-3 p-3 -ml-6 border border-accent rounded-lg"
            : ""
        } fixed z-20 top-7 left-56 text-2xl text-accent transition-all duration-500 ease-in-out`}
        onClick={handleButton}
      >
        {button ? <IoArrowForward /> : <IoArrowBack />}
      </button>
      <div
        className={`${
          button ? "-translate-x-64" : ""
        } transition-all duration-500 ease-in-out`}
      >
        <Sidebar label="Member" lists={listSideBarMember} />
      </div>
      <div
        className={`${
          button ? "ml-10" : "ml-64"
        } flex-1 p-6 transition-all duration-500 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
