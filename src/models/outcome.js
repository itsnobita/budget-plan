import mongoose, { Schema } from "mongoose";

const outcomeSchema = new Schema(
  {
    username: {
      type: String,
      default: "admin",
    },
    outcome_type: {
      type: String,
      default: "online",
    },
    outcome_amount: {
      type: Number,
      default: 0,
    },
    outcome_category: {
      type: String,
    },
    outcome_description: {
      type: String,
      default: "IDK",
    },
    insert_ts: {
      type: Date,
      default:()=> new Date(),
    },
  },
  {
    timestamps: false,
  }
);

const outcomeModel =
  mongoose.models.outcome || mongoose.model("outcome", outcomeSchema);

export default outcomeModel;
