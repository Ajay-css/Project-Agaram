import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqsData = [
  {
    question: "What is Agaram AI Interview Prep?",
    answer:
      "Agaram is a full-powered AI-based interview preparation web application designed to help candidates practice, analyze, and improve their interview performance using real-time AI feedback."
  },
  {
    question: "How does the AI interview analysis work?",
    answer:
      "Our system uses advanced AI models with Gemini AI support to analyze your responses in real time, evaluate clarity, confidence, structure, and provide actionable improvement suggestions."
  },
  {
    question: "Does Agaram provide real-time feedback?",
    answer:
      "Yes. During mock interviews, Agaram provides instant AI-driven insights including answer quality scoring and improvement recommendations."
  },
  {
    question: "Can I practice technical and HR interviews?",
    answer:
      "Absolutely. Agaram supports technical, HR, and behavioral interview simulations across multiple domains."
  },
  {
    question: "Is my interview data secure?",
    answer:
      "Yes. We prioritize privacy and data security. Your sessions are securely processed and never shared."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-indigo-600 uppercase tracking-wider"
        >
          FAQ
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mt-3 text-gray-900"
        >
          Everything About Agaram AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-4 max-w-md mx-auto text-sm"
        >
          AI-powered interview preparation with real-time analysis and performance insights.
        </motion.p>

        {/* FAQ List */}
        <div className="mt-14 flex flex-col gap-5 text-left">

          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{ layout: { duration: 0.4, type: "spring" } }}
                className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>

                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                {/* Answer Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;