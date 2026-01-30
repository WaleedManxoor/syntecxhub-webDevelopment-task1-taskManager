import { useState } from "react";
import api from "../api/axios";
import bg from "../assets/bg.jpg"; // imported space background

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-transparent bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 bg-opacity-40 text-red-600 text-sm p-3 rounded mb-4 backdrop-blur-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-white placeholder-gray-300"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-white placeholder-gray-300"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent text-white placeholder-gray-300"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={register}
            disabled={loading}
            className="w-full bg-indigo-600 bg-opacity-70 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-white mt-6">
          Already have an account?{" "}
          <a href="/" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
