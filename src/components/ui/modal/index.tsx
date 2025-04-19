import { Dispatch, useEffect, useRef } from "react";

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: any }) {

    const ref: any = useRef()

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if(ref.current && !ref.current.contains(event.target)){
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div
        className="bg-white dark:bg-secondary p-6 shadow-lg w-full max-w-[700px] max-h-[90vh] overflow-y-auto relative rounded-xl"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
