import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
  {
    username: {
      type: String,
      default:"admin"
    },
    income_type: {
      type: String,
      default:"online"
    },
    income_amount: {
      type: Number,
      default:0
    },
    income_description: {
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

const incomeModel =mongoose.models.income|| mongoose.model("income",incomeSchema)

export default incomeModel