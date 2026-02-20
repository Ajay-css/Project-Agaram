import { motion } from "framer-motion";

const features = [
  {
    title: "AI Mock Interviews",
    description:
      "Practice real-time mock interviews powered by Gemini AI with adaptive questioning based on your skill level.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Instant Smart Feedback",
    description:
      "Get deep insights on clarity, communication, technical accuracy, and confidence instantly after every answer.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M9 12l2 2l4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Role-Based Question Sets",
    description:
      "Choose Frontend, Backend, MERN, or company-specific roles and get tailored interview questions.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 20h8" />
      </svg>
    ),
  },
  {
    title: "Performance Tracking",
    description:
      "Track your improvement with AI-based scoring, analytics, and confidence growth insights.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 19V5" />
        <path d="M10 19V9" />
        <path d="M16 19v-6" />
        <path d="M22 19V3" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features to Boost Your Interview Success
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Agaram combines AI intelligence with real-world interview scenarios
            to help you become truly job-ready.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
