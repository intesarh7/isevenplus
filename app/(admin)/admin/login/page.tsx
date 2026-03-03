"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "The email or password you entered doesn’t match our records.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
                }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
                }`}
              value={password}
               onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}