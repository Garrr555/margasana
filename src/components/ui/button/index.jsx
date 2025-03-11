export default function Button({children, type, textcolor, bgcolor}){
    return (
      <button type={type} className={` px-5 py-2 ${textcolor} ${bgcolor}`}>
        {children}
      </button>
    );
}