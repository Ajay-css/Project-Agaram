import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChatBubble({ role, content }) {
  const [copied, setCopied] = useState(false);

  const isUser = role === "user";

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  const renderContent = () => {

    // ✅ NEW: Clean unwanted markdown stars & Question labels
    const cleanedContent = content
      .replace(/\*\*/g, "") // remove bold stars
      .replace(/Question\s*\d+\s*:/gi, ""); // remove Question 1:, Question 2:

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(cleanedContent)) !== null) {
      const [fullMatch, lang, code] = match;
      const index = match.index;

      // Normal text before code
      if (index > lastIndex) {
        parts.push(
          <p key={index} className="whitespace-pre-wrap leading-relaxed">
            {cleanedContent.slice(lastIndex, index)}
          </p>
        );
      }

      // Code block
      parts.push(
        <div
          key={index + "code"}
          className="relative group my-4 rounded-xl overflow-hidden border border-gray-700"
        >
          <button
            onClick={() => handleCopy(code)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-gray-800 p-2 rounded-md"
          >
            <Copy size={16} />
          </button>

          <SyntaxHighlighter
            language={lang || "javascript"}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.2rem",
              background: "#0f172a",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = index + fullMatch.length;
    }

    // Remaining normal text
    if (lastIndex < cleanedContent.length) {
      parts.push(
        <p key="last" className="whitespace-pre-wrap leading-relaxed">
          {cleanedContent.slice(lastIndex)}
        </p>
      );
    }

    return parts;
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transition-all
        ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
            : "bg-gray-900 border border-gray-800 text-gray-200"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
}