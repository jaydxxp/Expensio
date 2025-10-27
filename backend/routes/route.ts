import express from "express";
import SignupRoute from "./Signup"
import SigninRoute from "./Signin"
import ExpenseRoute from "./Expense"
const router =express.Router();
router.use("/auth",[SignupRoute,SigninRoute]);
router.use("/Expense",ExpenseRoute)
export default router;