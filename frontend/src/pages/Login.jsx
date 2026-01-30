import { useState } from "react";
import api from "../api/axios";
import bg from "../assets/bg.jpg"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-transparent bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Welcome Back!
        </h2>

        {error && (
          <p className="bg-red-100 bg-opacity-40 text-red-600 text-sm p-3 rounded mb-4 backdrop-blur-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-white placeholder-gray-300"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-white placeholder-gray-300"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-indigo-600 bg-opacity-70 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm text-white mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
