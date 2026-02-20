import { motion } from "framer-motion";

export default function ScoreCard({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg"
    >
      <h2 className="text-3xl font-bold mb-6">Interview Result</h2>

      <p className="text-5xl font-bold text-indigo-600 mb-4">
        {result?.overallScore}
      </p>

      <div className="space-y-2 text-gray-700">
        <p>Communication: {result?.communication}</p>
        <p>Technical: {result?.technical}</p>
        <p>Confidence: {result?.confidence}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Improvements:</h4>
        <ul className="list-disc ml-5">
          {result?.improvements?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-gray-600">{result?.summary}</p>
    </motion.div>
  );
}