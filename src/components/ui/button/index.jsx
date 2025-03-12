export default function Button({children, type, textcolor, bgcolor, onClick}){
    return (
      <button onClick={onClick} type={type} className={` px-5 py-2 ${textcolor} ${bgcolor} font-semibold hover:opacity-80 transition-all duration-500 ease-in-out`}>
        {children}
      </button>
    );
}