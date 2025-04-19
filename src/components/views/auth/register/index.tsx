"use client";

import authServices from "@/services/auth";

import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export default function RegisterView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is Already registered");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-secondary p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-accent text-3xl font-bold mb-4">
          Register
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white/80">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-accent focus:ring-1 bg-primary rounded-xl"
              placeholder="exampel"
            />
          </div>
          <div>
            <label className="block text-white/80">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
              placeholder="exampel@gmail.com"
            />
          </div>
          <div>
            <label className="block text-white/80">Phone</label>
            <input
              name="phone"
              id="phone"
              type="number"
              className="w-full px-4 py-2 focus:outline-none focus:ring-accent focus:ring-1 bg-primary rounded-xl appearance-none"
              placeholder="1234567890"
            />
          </div>

          <div>
            <label className="block text-white/80">Password</label>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
                placeholder={showPassword ? "password" : "••••••••"}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-white/60"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-primary py-2 rounded-xl hover:bg-accent-hover"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <div className="flex items-center justify-center font-bold">
                <span className="text-2xl mx-1">
                  <FaUserPlus />
                </span>{" "}
                Register
              </div>
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-white/80">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
