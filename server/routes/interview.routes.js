import express from "express";
import {
  createInterview,
  sendMessage,
} from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import Interview from "../models/Interview.js";

const router = express.Router();

// Get Interview by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/start", protect, createInterview);
router.post("/message", protect, sendMessage);

export default router;