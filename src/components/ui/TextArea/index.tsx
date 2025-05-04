"use client";

import { useEffect, useState } from "react";

type Propstype = {
  label?: string;
  name: string;
  placeholder?: string | number;
  placeholderreal?: string;
  visible?: boolean;
  handleVisible?: any;
  defaultValue?: string;
  disable?: boolean;
  onChange?: (e: any) => void;
  className?: string;
  value?: string | number;
};

export default function Textarea(props: Propstype) {
  const {
    label,
    name,
    placeholder,
    placeholderreal,
    defaultValue,
    className,
    disable,
    onChange,
    value: controlledValue,
  } = props;

  // State internal hanya digunakan kalau tidak ada props.value
  const [internalValue, setInternalValue] = useState<string>("");

  useEffect(() => {
    // Set nilai awal jika component pertama kali dimount
    if (controlledValue === undefined) {
      if (defaultValue !== undefined) {
        setInternalValue(String(defaultValue));
      } else if (placeholder !== undefined) {
        setInternalValue(String(placeholder));
      } else {
        setInternalValue("");
      }
    }
  }, [defaultValue, placeholder, controlledValue]);

  const handleChange:any = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    // Jika tidak controlled, update internal state
    if (controlledValue === undefined) {
      setInternalValue(e.target.value);
    }
  };

  const inputValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={label} className="mx-2">
        {label}
      </label>
      <textarea
        placeholder={placeholderreal}
        disabled={disable}
        id={name}
        name={name}
        className={`${
          disable && "text-gray-600"
        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-white/80 bg-primary rounded-xl`}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
