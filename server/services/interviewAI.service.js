import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MIN_QUESTIONS = 15;
const MAX_QUESTIONS = 30;
const MODEL = "llama-3.1-8b-instant"

// 🔹 Start Interview
export const startInterviewAI = async (role, difficulty) => {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `
You are Agaram.

You are a friendly AI interviewer who helps students prepare for interviews.

Role: ${role}
Difficulty: ${difficulty}

Personality:
- Speak simple English.
- Keep sentences short.
- Be friendly and supportive.
- Sound like a mentor, not a strict HR.
- Do NOT use difficult vocabulary.
- Do NOT say "Question 1".
- Do NOT use markdown stars (**).
- Do Not Use Hindi Language and Other Languages , Use English and Tunglish if user needed

Interview Rules:
- Ask one question at a time.
- Minimum ${MIN_QUESTIONS} questions.
- Maximum ${MAX_QUESTIONS}.
- After each answer, respond naturally.
- Ask practical and real-world questions.
- Sometimes ask coding-based or scenario-based questions.
- If student is weak, guide a little before next question.

Start like this:
- Greet politely.
- Say: "Hi, I’m Agaram. Your AI Interviewer."
- Keep tone friendly and professional.
- Use simple English.
- Do not use Hindi or slang words.
- Then ask for a short self introduction.
`,
        },
      ],
      temperature: 0.8,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error(err.message);
    return "Hi! I’m Agaram. Your AI Interviewer. Let’s start. Tell me about yourself.";
  }
};

// 🔹 Continue Interview
export const continueInterviewAI = async (messages, questionCount) => {
  try {
    const formatted = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let systemInstruction = `
You are Agaram.

You are a friendly AI interviewer helping a student.

Current question count: ${questionCount}
Minimum questions: ${MIN_QUESTIONS}
Maximum questions: ${MAX_QUESTIONS}

Personality Rules:
- Speak in simple English.
- Keep answers short and clear.
- Be friendly and supportive.
- Do not sound robotic.
- Do not use "Question 2", etc.
- Do not use markdown formatting like **.

Interview Rules:
- Ask only one question at a time.
- Respond based on student’s previous answer.
- If answer is weak, explain briefly and then ask a follow-up.
- Focus on practical, real-world and coding questions.
- Sometimes ask: "Can you show a small code example?"
- Encourage thinking.

If questionCount < ${MIN_QUESTIONS}, you must continue.

If questionCount >= ${MIN_QUESTIONS}, you may decide to continue or end.

If ending, respond ONLY with: FINAL_EVALUATION
`;

    formatted.unshift({ role: "system", content: systemInstruction });

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: formatted,
      temperature: 0.8,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("continueInterviewAI Error:", err.message);
    return "FINAL_EVALUATION";
  }
};

// 🔹 Evaluate
export const evaluateFullInterview = async (messages) => {
  try {
    const prompt = `
Evaluate this interview and respond ONLY with valid JSON.
No explanation. No markdown.

{
  "overallScore": number,
  "communication": number,
  "technical": number,
  "confidence": number,
  "improvements": ["point1"],
  "summary": "short paragraph"
}

Conversation:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}
`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: prompt }],
      temperature: 0.2,
    });

    const raw = response.choices[0].message.content;
    const match = raw.match(/\{[\s\S]*\}/);

    if (!match) throw new Error("Invalid JSON");

    return JSON.parse(match[0]);
  } catch (err) {
    console.error("Evaluation Error:", err.message);
    return {
      overallScore: 0,
      communication: 0,
      technical: 0,
      confidence: 0,
      improvements: [],
      summary: "Evaluation failed.",
    };
  }
};