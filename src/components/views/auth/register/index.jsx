"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const {push} = useRouter()
   const handleSubmit = async(event) =>{
     event.preventDefault();
     setIsLoading(true)
     setError('')
     const data = {
       email: event.target.email.value,
       password: event.target.password.value,
       fullname: event.target.fullname.value,
       phone: event.target.phone.value,
     };

     const result = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
     })

     if(result.status == 200){
         event.target.reset();
         setIsLoading(false)
         push('/login')
     } else{
        setIsLoading(false)
        setError('Email already exist')
     }
   }
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-secondary p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-white text-2xl font-semibold mb-4">
          Register
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white/80">fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-accent focus:ring-1 bg-primary rounded-xl"
              placeholder="Enter your fullname"
            />
          </div>
          <div>
            <label className="block text-white/80">Phone</label>
            <input
              name="phone"
              id="phone"
              type="number"
              className="w-full px-4 py-2 focus:outline-none focus:ring-accent focus:ring-1 bg-primary rounded-xl appearance-none"
              placeholder="Enter your phone"
            />
          </div>

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
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="text-accent">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
