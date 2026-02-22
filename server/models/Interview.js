import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["system", "assistant", "user"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    liveFeedback: { type: Boolean, default: false },

    messages: {
      type: [messageSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    questionCount: {
      type: Number,
      default: 0,
    },

    result: {
      overallScore: Number,
      communication: Number,
      technical: Number,
      confidence: Number,
      improvements: [String],
      summary: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);