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
    if (!role.trim()) {
      return toast.error("Please enter job role");
    }

    try {
      setLoading(true);

      const response = await startInterview({
        role: role.trim(),
        difficulty,
        liveFeedback,
      });

      console.log("Start Interview Response:", response.data);

      const { interviewId, firstQuestion } = response.data;

      if (!interviewId || !firstQuestion) {
        throw new Error("Invalid response");
      }

      // Send proper structure to parent
      onStart({
        _id: interviewId,
        firstQuestion,
      });

      toast.success("Interview Started");

    } catch (err) {
      console.error("Start Interview Error:", err);
      toast.error("Failed to start interview. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-xl max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">
        Start Your AI Interview with Agaram
      </h2>

      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Job Role"
        className="w-full mb-4 p-3 bg-white text-black rounded-xl border"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full mb-4 p-3 bg-white text-black rounded-xl border"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <label className="flex items-center justify-between mb-6 cursor-pointer select-none">
        <div
          onClick={() => setLiveFeedback(!liveFeedback)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${liveFeedback ? "bg-blue-600" : "bg-gray-300"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${liveFeedback ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </div>
        
        <span className="text-sm font-medium text-gray-700">
          Enable Live AI Feedback
        </span>
      </label>

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
      >
        <Play size={18} />
        {loading ? "Starting..." : "Start Interview"}
      </button>
    </motion.div>
  );
}