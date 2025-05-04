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
  disabled?: boolean;
};

export default function Button(props: propsType) {
  const {
    type,
    onClick,
    children,
    textcolor,
    bgcolor,
    variant,
    icon,
    disabled,
  } = props;

  console.log(disabled)

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${
        disabled ? "opacity-50" : "hover:opacity-80"
      } px-5 py-2 ${textcolor} ${bgcolor} font-semibold  transition-all duration-500 ease-in-out flex items-center justify-center gap-1`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
