"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import GoogleBtn from "../../../layouts/googlebtn";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useSearchParams } from "next/navigation";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const form = event.target as HTMLFormElement;
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        (event.target as HTMLFormElement).reset();
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
        <h2 className="text-center text-accent text-3xl font-bold mb-4">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-third">Email</label>
            {/* <div className="absolute left-3 top-9 text-white/60 text-xl">
              <MdEmail />
            </div> */}
            <input
              name="email"
              id="email"
              type="email"
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
              placeholder={`exampel@gmail.com`}
            />
          </div>

          <div className="relative">
            <label className="block text-third">Password</label>
            {/* <div className="absolute left-3 top-9 text-white/60 text-xl">
              <RiLockPasswordFill />
            </div> */}
            <input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-primary rounded-xl"
              placeholder={
                showPassword ? "password" : "••••••••"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-third"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary py-2 rounded-xl hover:bg-accent-hover"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <div className="flex items-center justify-center font-bold">
                <span className="text-2xl">
                  <IoMdLogIn />
                </span>{" "}
                Login
              </div>
            )}
          </button>
        </form>
        <br />
        <hr />
        <br />
        <GoogleBtn
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        />

        <p className="mt-4 text-center text-third">
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-accent">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
