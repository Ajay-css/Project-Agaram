import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";

dotenv.config();

const app = express();

/* ---------------- SECURITY ---------------- */

// Trust proxy (important for Render / Railway / etc.)
app.set("trust proxy", 1);

// Rate limiting (basic free tier protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Secure headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS (Allow your frontend domain in production)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    status: "running",
    service: "Agaram AI Backend",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});