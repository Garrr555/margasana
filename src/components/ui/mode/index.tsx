"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ModeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 bg-secondary rounded-full p-1 transition-colors duration-300 focus:outline-none"
    >
      {/* Icon Moon */}
      <FiMoon className="absolute right-1 text-blue-500" size={16} />
      {/* Icon Sun */}
      <FiSun className="absolute left-1 text-yellow-500" size={16} />

      {/* Circle toggle */}
      <span
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === "dark"
            ? "translate-x-0 bg-blue-500"
            : "translate-x-8 bg-yellow-500"
        }`}
      ></span>
    </button>
  );
}
