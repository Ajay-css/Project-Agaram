import { startInterviewAI } from "./services/interviewAI.service.js";
import "dotenv/config"

const test = async () => {
  const res = await startInterviewAI("MERN Stack Developer");
  console.log(res);
};

test();