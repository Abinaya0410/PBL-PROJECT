

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      // Store token
      localStorage.setItem("token", data.token);

      // Store role
      localStorage.setItem("role", data.user.role);

      // Store email
      localStorage.setItem("email", data.user.email);

      // ⭐⭐⭐ MOST IMPORTANT LINE (YOU MISSED THIS)
      localStorage.setItem("name", data.user.name);

      // Redirect based on profile completion
      if (!data.user.profileCompleted) {
        if (data.user.role === "teacher") {
          navigate("/teacher-onboarding");
        } else {
          navigate("/student-onboarding");
        }
      } else {
        if (data.user.role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/student-dashboard");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Virtual Academic Intelligence Hub
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
