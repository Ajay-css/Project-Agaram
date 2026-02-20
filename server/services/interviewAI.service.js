import { model } from "../config/gemini.js";

// 🔹 Start Interview
export const startInterviewAI = async (role, difficulty) => {
  const prompt = `
You are a professional HR interviewer.

Interview Role: ${role}
Difficulty Level: ${difficulty}

Rules:
- First ask the candidate to introduce themselves.
- Ask one question at a time in simple english understandable for students.
- Adjust difficulty based on answers.
- Do NOT give feedback during interview.
- If you feel interview is complete, respond ONLY with:
FINAL_EVALUATION
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

// 🔹 Continue Interview
export const continueInterviewAI = async (messages) => {
  const conversation = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const prompt = `
You are continuing a professional interview.

Rules:
- Ask one question at a time.
- If enough information is gathered,
  respond ONLY with:
FINAL_EVALUATION

Conversation so far:
${conversation}
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

// 🔹 Final Evaluation
export const evaluateFullInterview = async (messages) => {
  const transcript = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const prompt = `
Analyze this interview transcript:

${transcript}

Return STRICT JSON only:

{
  "overallScore": number,
  "communication": number,
  "technical": number,
  "confidence": number,
  "improvements": [],
  "summary": ""
}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Remove markdown if AI adds ```
  if (text.startsWith("```")) {
    text = text.replace(/```json|```/g, "").trim();
  }

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("AI JSON Parse Error:", text);

    parsed = {
      overallScore: 50,
      communication: 50,
      technical: 50,
      confidence: 50,
      improvements: ["AI evaluation failed. Please retry."],
      summary: "Evaluation parsing failed."
    };
  }

  return parsed;
};