import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["system", "ai", "user"],
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    liveFeedback: {
      type: Boolean,
      default: false,
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "completed"],   // 🔥 aligned with controller
      default: "active",
    },

    questionCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    result: {
      overallScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      communication: {
        type: Number,
        min: 0,
        max: 100,
      },
      technical: {
        type: Number,
        min: 0,
        max: 100,
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
      },
      improvements: {
        type: [String],
        default: [],
      },
      summary: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);