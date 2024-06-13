import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    totalHours: {
      type: Number,
      min: 0,
      required: true,
    },
    investedHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    progress: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
    status: {
      type: String,
      enum: ["InProgress", "Completed"],
      default: "InProgress",
    },
    completionDate: {
      type: Date,
      default: null,
    },
    expectedCompletionDate: {
      type: Date,
      required: true,
    },
    logo: {
      type: Number,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "goals"
  }
);

const Goal = mongoose.model("Goal", GoalSchema);
export default Goal;
