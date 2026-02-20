import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import toast from "react-hot-toast";
import { startInterview } from "../services/interview.api.js";

export default function Query({ onStart }) {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [liveFeedback, setLiveFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!role) return toast.error("Please enter job role");

    try {
      setLoading(true);

      const { data } = await startInterview({
        role,
        difficulty,
        liveFeedback,
      });

      if (!data?._id) {
        throw new Error("Invalid response");
      }

      onStart(data);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-3xl shadow-xl max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Start Your AI Interview
      </h2>

      <input
        type="text"
        placeholder="Job Role (e.g. MERN Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      {/* Toggle */}
      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3 mb-6">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={liveFeedback}
          onChange={() => setLiveFeedback(!liveFeedback)}
        />
        <div className="w-16 h-8 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
        <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
        Enable Live AI Feedback
      </label>

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
      >
        <Play size={18} />
        {loading ? "Starting..." : "Start Interview"}
      </button>
    </motion.div>
  );
}