import { motion } from "framer-motion";
import agaramLogo from "../assets/logo.png";

export default function LoaderScreen({
  text = "Preparing your AI Interview...",
}) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <motion.img
        src={agaramLogo}
        alt="Agaram Logo"
        className="h-14 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="w-10 h-1 bg-indigo-600 rounded-full"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />

      <p className="mt-6 text-lg font-medium text-gray-700">
        {text}
      </p>
    </div>
  );
}