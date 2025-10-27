import express, { NextFunction, Request, Response } from "express";
import z from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Expense, { IExpense } from "../model/ExpenseModel";
import AuthMiddleware from "../middleware";
dotenv.config();
const router = express.Router();
router.use(express.json());
const ExpenseBody = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string().min(1),
  date: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : new Date()),
    z.date()
  ),
  recurring: z.boolean().optional(),
  notes: z.string().optional(),
});
router.post(
  "/create",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = ExpenseBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(402).json({
        message: "Please Write Given Fields Correctly",
      });
    }
    const newExpense = await Expense.create({
      title: parsed.data.title,
      amount: parsed.data.amount,
      category: parsed.data.category,
      date: parsed.data.date,
      recurring: parsed.data.recurring,
      notes: parsed.data.notes,
      user: req.user?._id,
    });
    return res.json({
      newExpense,
    });
  }
);
router.get(
  "/allexpense",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const allExpense = await Expense.find({ user: req.user?._id }).sort({
      date: -1,
    });
    return res.json({
      allExpense,
    });
  }
);

router.put(
  "/update/:id",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = ExpenseBody.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Please provide the fields correctly",
        });
      }

      const expense = await Expense.findByIdAndUpdate(req.params.id);
      if (!expense)
        return res.status(404).json({ message: "Expense not found." });

      expense.title = parsed.data.title || expense.title;
      expense.amount = parsed.data.amount || expense.amount;
      expense.category = parsed.data.category || expense.category;
      expense.date = parsed.data.date || expense.date;
      expense.recurring = parsed.data.recurring ?? expense.recurring;
      expense.notes = parsed.data.notes || expense.notes;

      const updatedExpense = await expense.save();

      return res.json({ updatedExpense });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const Deletedexpense = await Expense.findByIdAndDelete(req.params.id);
      if (!Deletedexpense)
        return res.status(404).json({ message: "Expense not found." });

      res.status(200).json({ message: "Expense deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense.", error });
    }
  }
);
router.post(
  "/ai/query",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, expenses } = req.body;

      if (!query || !expenses) {
        return res.status(400).json({
          success: false,
          message: "Query and expenses are required",
        });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const expenseContext = `
You are a helpful expense tracking assistant. Analyze the following expense data and answer the user's question.

User's Expenses:
${JSON.stringify(expenses, null, 2)}

User Question: ${query}

Provide a clear, concise answer with relevant insights. Use markdown formatting for better readability. Include numbers, percentages, and specific details where relevant.
`;

      const result = await model.generateContent(expenseContext);
      const response = await result.response;
      const aiResponse = response.text();

      return res.json({
        success: true,
        response: aiResponse,
      });
    } catch (error) {
      console.error("AI Query Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to process AI query",
      });
    }
  }
);
export default router;
