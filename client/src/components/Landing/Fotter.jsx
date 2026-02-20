import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-24">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Agaram AI
          </h2>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-sm">
            Agaram is an AI-powered interview preparation platform designed to
            help candidates practice smarter, receive real-time feedback, and
            improve confidently using advanced AI analysis.
          </p>

          <div className="mt-6 text-sm text-indigo-600 font-medium">
            Crack Interviews with Confidence 🚀
          </div>
        </div>

        {/* Company Links */}
        <div className="md:mx-auto">
          <h3 className="font-semibold text-gray-900 mb-6">
            Company
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {["About", "Features", "Contact", "Privacy Policy"].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                href="#"
                className="hover:text-indigo-600 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-6">
            Stay Updated
          </h3>

          <p className="text-sm text-gray-600 mb-6 max-w-sm">
            Get interview tips, AI insights, and product updates directly to your inbox.
          </p>

          <div className="flex items-center max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 px-4 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="h-11 px-5 bg-indigo-600 text-white text-sm rounded-r-xl hover:bg-indigo-700 transition"
            >
              Subscribe
            </motion.button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © 2026 Agaram AI. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-indigo-600 transition"
              >
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}