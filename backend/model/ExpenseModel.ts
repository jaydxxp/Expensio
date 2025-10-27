
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date: Date;
  user: mongoose.Types.ObjectId;
  recurring?: boolean;
  notes?: string;
}

const expenseSchema: Schema<IExpense> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Expense: Model<IExpense> = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
