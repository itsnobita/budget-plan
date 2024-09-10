import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
  {
    outcome_category: {
      type: String,
      default:""
    },
    insert_ts: {
      type: Date,
      default:()=>new Date()
    }
  },
  {
    timestamps: false,
  }
);

const outcomeCategoryModel =mongoose.models.outcome_category|| mongoose.model("outcome_category",incomeSchema)

export default outcomeCategoryModel