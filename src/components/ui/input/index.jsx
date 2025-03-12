'use client'

import { useState } from "react";

export default function Input({ label, name, type, placeholder, disable }) {

     const [value, setValue] = useState(placeholder || "");
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={label} className="mx-2">
        {label}
      </label>
      <input
        disabled={disable}
        id={name}
        name={name}
        type={type}
        className={`${disable && "text-gray-500"} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-white/80 bg-primary rounded-xl`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}