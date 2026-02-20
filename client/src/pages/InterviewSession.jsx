import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sendMessage } from "../services/interview.api";
import ChatBubble from "../components/ChatBubble";
import TypingIndicator from "../components/TypingIndicator";
import LoaderScreen from "../components/LoaderScreen";
import toast from "react-hot-toast";
import API from "../services/axios";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const { data } = await API.get(`/api/interview/${id}`);
        setMessages(data.messages);
      } catch {
        toast.error("Failed to load interview");
      } finally {
        setPageLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await sendMessage({
        interviewId: id,
        answer: input,
      });

      if (data.interviewEnded) {
        navigate(`/result/${id}`, { state: data.result });
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.aiResponse },
      ]);
    } catch {
      toast.error("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <LoaderScreen />;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ChatGPT Style Input */}
      <div className="border-t bg-white py-6">
        <div className="max-w-3xl mx-auto px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center bg-gray-100 rounded-2xl px-6 py-4 shadow-lg focus-within:ring-2 focus-within:ring-blue-400 transition"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Agaram..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.9 }}
              className="ml-3 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-xl transition"
            >
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}