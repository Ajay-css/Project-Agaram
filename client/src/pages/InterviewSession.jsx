import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { sendMessage, getInterview } from "../services/interview.api";
import ChatBubble from "../components/ChatBubble";
import TypingIndicator from "../components/TypingIndicator";
import LoaderScreen from "../components/LoaderScreen";
import toast from "react-hot-toast";
import { Send, X } from "lucide-react";
import { motion } from "framer-motion";

export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [typingMessage, setTypingMessage] = useState("");

  // 🔹 Fetch interview
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const { data } = await getInterview(id);
        setMessages(data.messages);
      } catch {
        toast.error("Failed to load interview. Are you logged in?");
      } finally {
        setPageLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  // 🔹 Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage, loading]);

  // 🔹 Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || typingMessage) return;

    const answer = input;
    setMessages((prev) => [...prev, { role: "user", content: answer }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await sendMessage({ interviewId: id, answer });

      if (data.interviewEnded) {
        navigate(`/result/${id}`, { state: data.result });
        return;
      }

      const fullText = data.aiResponse;
      let index = 0;
      setTypingMessage("");

      typingIntervalRef.current = setInterval(() => {
        setTypingMessage((prev) => prev + fullText[index]);
        index++;

        if (index >= fullText.length) {
          clearInterval(typingIntervalRef.current);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: fullText },
          ]);
          setTypingMessage("");
        }
      }, 15);
    } catch {
      toast.error("Error sending message. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <LoaderScreen />;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-black via-[#0f172a] to-black text-white">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 backdrop-blur-xl">
        <h2 className="text-lg font-semibold tracking-wide text-gray-300">
          Agaram Interview Session
        </h2>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition text-sm"
        >
          <X size={16} />
          Close
        </Link>
      </div>

      {/* 🔹 Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {/* Typing animation bubble */}
          {typingMessage && (
            <ChatBubble role="assistant" content={typingMessage} />
          )}

          {loading && !typingMessage && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* 🔹 Input Area */}
      <div className="border-t border-gray-800 backdrop-blur-xl py-6">
        <div className="max-w-4xl mx-auto px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center transition focus-within:border-blue-500"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              disabled={loading || typingMessage}
              className="flex-1 bg-transparent border border-gray-400 p-3 rounded-full outline-none text-gray-200 placeholder-gray-500"
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.9 }}
              disabled={loading || typingMessage}
              className="ml-4 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}