import { motion } from "framer-motion";

export default function TypingIndicator() {
  const lines = [0, 1, 2, 3];

  return (
    <div className="flex items-end gap-1 h-6">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: ["6px", "20px", "6px"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-[3px] bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"
        />
      ))}
    </div>
  );
}