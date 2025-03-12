'use client'

import { useEffect, useRef } from "react";

export default function Modal({ children, onClose }) {
    const ref = useRef()
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, [onClose])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-secondary p-6 shadow-lg w-[700px] relative rounded-xl" ref={ref}>
        {children}
      </div>
    </div>
  );
}
