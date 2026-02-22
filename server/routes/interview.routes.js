import express from "express";
import { createInterview, sendMessage } from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import Interview from "../models/Interview.js"

const router = express.Router();

router.post("/start", protect, createInterview);
router.post("/message", protect, sendMessage);
router.get("/:id", protect, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id, // 🔥 correct field
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({
      _id: interview._id,
      messages: interview.messages || [],
    });

  } catch (err) {
    console.error("GET INTERVIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;