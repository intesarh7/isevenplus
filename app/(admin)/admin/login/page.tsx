"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    if(loading) return;

    setError(null);
    setLoading(true);

    try {

      const res = await fetch("/api/admin/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          email,
          password
        })
      });

      let data:any = {};

      try{
        data = await res.json();
      }catch{
        data = {};
      }

      if(res.ok){

        // redirect to admin dashboard
        router.replace("/admin");

      }else{

        setError(
          data?.error ||
          "The email or password you entered is incorrect."
        );

      }

    }catch(err){

      console.error("Login error:",err);

      setError("Unable to login. Please try again.");

    }finally{

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl p-8 rounded-2xl w-95">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email address"
            required
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2
            ${error
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-blue-500"
            }`}
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
              setError(null);
            }}
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            required
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2
            ${error
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-blue-500"
            }`}
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
              setError(null);
            }}
          />

          {/* ERROR MESSAGE */}

          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
            hover:bg-blue-700 transition
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );

}