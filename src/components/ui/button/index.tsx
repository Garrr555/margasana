import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type propsType = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  textcolor?: string;
  bgcolor?: string;
  variant?: string;
  icon?: JSX.Element;
};

export default function Button(props: propsType) {
  const { type, onClick, children, textcolor, bgcolor, variant, icon } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      className={` px-5 py-2 ${textcolor} ${bgcolor} font-semibold hover:opacity-80 transition-all duration-500 ease-in-out flex items-center justify-center gap-1`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
