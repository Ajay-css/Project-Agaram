import Interview from "../models/Interview.js";
import {
  startInterviewAI,
  continueInterviewAI,
  evaluateFullInterview,
} from "../services/interviewAI.service.js";

const MIN_QUESTIONS = 15;
const MAX_QUESTIONS = 30;

// 🔹 Start
export const createInterview = async (req, res) => {
  try {
    const { role, difficulty, liveFeedback } = req.body;

    const firstQuestion = await startInterviewAI(role, difficulty);

    const interview = await Interview.create({
      user: req.user._id,   // ✅ FIXED
      role,
      difficulty,
      liveFeedback,
      questionCount: 1,
      messages: [{ role: "assistant", content: firstQuestion }],
    });

    res.status(201).json({
      interviewId: interview._id,
      firstQuestion,
    });
  } catch (err) {
    console.error("CREATE INTERVIEW ERROR:", err);
    res.status(500).json({ message: "Failed to start interview" });
  }
};

// 🔹 Continue

export const sendMessage = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: "Not found" });

    if (interview.status === "completed")
      return res.status(400).json({ message: "Already completed" });

    // Save user answer
    interview.messages.push({ role: "user", content: answer });
    interview.questionCount += 1;

    // HARD STOP at 30
    if (interview.questionCount >= MAX_QUESTIONS) {
      const result = await evaluateFullInterview(interview.messages);
      interview.status = "completed";
      interview.result = result;
      await interview.save();
      return res.json({ interviewEnded: true, result });
    }

    const aiResponse = await continueInterviewAI(
      interview.messages,
      interview.questionCount
    );

    // 🔥 IMPORTANT FIX
    if (aiResponse === "FINAL_EVALUATION") {

      if (interview.questionCount < MIN_QUESTIONS) {
        // Ignore AI decision
        interview.messages.push({
          role: "assistant",
          content:
            "We have not yet reached the minimum required questions. Let's continue.\n\nNext question: Explain the difference between let, var and const in JavaScript."
        });

        await interview.save();

        return res.json({
          interviewEnded: false,
          aiResponse:
            "We have not yet reached the minimum required questions. Let's continue.\n\nExplain the difference between let, var and const."
        });
      }

      // If >= 15 then allow ending
      const result = await evaluateFullInterview(interview.messages);
      interview.status = "completed";
      interview.result = result;
      await interview.save();

      return res.json({ interviewEnded: true, result });
    }

    interview.messages.push({ role: "assistant", content: aiResponse });
    await interview.save();

    res.json({ interviewEnded: false, aiResponse });

  } catch (err) {
    res.status(500).json({ message: "Processing failed" });
  }
};