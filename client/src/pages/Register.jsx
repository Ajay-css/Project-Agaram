import { motion } from "framer-motion"
import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/auth/register`,
        formData
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Account Created")
        navigate("/dashboard");
      } else {
        setError(data.message);
        toast.error(data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100"
      >

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Name */}
        <div className="relative mb-5">
          <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 rounded-full border bg-white text-black border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition" />
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 rounded-full border bg-white text-black border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 rounded-full border bg-white text-black border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-6 text-center">
          <input type="checkbox" className="mr-1" />
          By Continuing , I Agree To The Terms Of Use & Privacy Policy.
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full text-center pl-11 pr-4 py-3 rounded-full border bg-blue-600 text-black border-gray-400 
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
             outline-none transition flex items-center justify-center gap-2 
             disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Creating...</span>
            </>
          ) : (
            <p className="text-white text-center mr-2">Sign Up</p>
          )}
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>

      </motion.form>
    </div>
  )
}
