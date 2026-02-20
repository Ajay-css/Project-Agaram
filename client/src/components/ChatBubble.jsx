import { motion } from "framer-motion";
import { User } from "lucide-react";
import TypingIndicator from "./TypingIndicator";

export default function ChatBubble({ role, content, isTyping }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Profile */}
      {!isUser && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center 
        bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-semibold shadow-md">
          A
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {isTyping ? <TypingIndicator /> : content}
      </div>

      {/* User Profile */}
      {isUser && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center 
        bg-gray-300 text-gray-700 shadow-md">
          <User size={16} />
        </div>
      )}
    </motion.div>
  );
}