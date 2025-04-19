import Link from "next/link";

type PropsType = {
    children: React.ReactNode,
    error?: string,
    link: string,
    linkText?: string,
    title?: string,
    textColor?: string,
}

export default function AuthLayout(props:PropsType){

    const {error, link, linkText, children, title, textColor} = props

    return (
        <div className="font-serif bg-black bg-opacity-30 rounded-lg  shadow-lg">
          <h1 className="text-center my-2 font-bold text-[40px] text-white">
            {title}
          </h1>
          {error && (
            <div className="text-red-500 text-center text-[20px]">
              {error}
            </div>
          )}
          <div className={` px-3 py-5 w-96 ${textColor}`}>
            {children}
          </div>
         
          <p className="text-center my-5 text-white font-light">
           {linkText}
            <span className="text-white font-semibold cursor-pointer">
              <Link href={link}> Sign up here</Link>
            </span>
          </p>
        </div>
    );
}