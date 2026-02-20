import Interview from "../models/Interview.js";
import {
  startInterviewAI,
  continueInterviewAI,
  evaluateFullInterview,
} from "../services/interviewAI.service.js";

// 🔹 Start Interview
export const createInterview = async (req, res) => {
  try {
    const { role, difficulty, liveFeedback } = req.body;

    const firstQuestion = await startInterviewAI(role, difficulty);

    const interview = await Interview.create({
      userId: req.user,
      role,
      difficulty,
      liveFeedback,
      status: "active",
      questionCount: 0,
      messages: [{ role: "ai", content: firstQuestion }],
    });

    res.json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to start interview" });
  }
};

// 🔹 Send Answer
export const sendMessage = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    // Ownership check
    if (interview.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (interview.status === "completed") {
      return res.status(400).json({ message: "Interview already completed" });
    }

    // Add user answer
    interview.messages.push({ role: "user", content: answer });
    interview.questionCount += 1;

    // 🔥 Fail Safe → Max 8 Questions
    if (interview.questionCount >= 8) {
      const result = await evaluateFullInterview(interview.messages);

      interview.status = "completed";
      interview.result = result;

      await interview.save();

      return res.json({
        interviewEnded: true,
        result,
      });
    }

    const aiResponse = await continueInterviewAI(interview.messages);

    // 🔥 AI decided to stop
    if (aiResponse.includes("FINAL_EVALUATION")) {
      interview.messages.push({ role: "ai", content: aiResponse });

      const result = await evaluateFullInterview(interview.messages);

      interview.status = "completed";
      interview.result = result;

      await interview.save();

      return res.json({
        interviewEnded: true,
        result,
      });
    }

    // Continue normally
    interview.messages.push({ role: "ai", content: aiResponse });
    await interview.save();

    res.json({
      interviewEnded: false,
      aiResponse,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Interview processing failed" });
  }
};