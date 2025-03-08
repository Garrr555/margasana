"use client";

import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import GoogleBtn from "../../../layouts/googlebtn";
import { FaGoogle } from "react-icons/fa";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      console.log(res)
      if (!res?.error) {
        setIsLoading(false);
        event.target.reset();
        router.push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-secondary p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-white text-2xl font-semibold mb-4">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white/80">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white/80">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary py-2 rounded-xl hover:bg-accent-hover"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <br />
        <hr />
        <br />
        <GoogleBtn onClick={() => signIn("google", { callbackUrl, redirect: false })}/>

        <p className="mt-4 text-center text-white/80">
          Don't have an account?{" "}
          <Link href="/register" className="text-accent">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
