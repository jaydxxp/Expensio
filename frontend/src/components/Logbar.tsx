import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Expense {
  _id?: string;
  title: string;
  category: string;
  date?: string;
  amount: number;
  recurring: boolean;
  notes?: string;
}

export default function Logbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSigninPage = location.pathname === "/signin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isSigninPage) {
    return (
      <Link to="/signup">
        <button className="px-5 py-2 rounded-full font-semibold bg-[#171717] border border-[#282828] text-white focus:ring-2 focus:ring-gray-500 hover:shadow-xl hover:scale-105 transition-all duration-200">
          Signup
        </button>
      </Link>
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      title: "Eat Repeat",
      category: "Food",
      date: "2025-10-27",
      amount: 222,
      recurring: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState<number | "">("");
  const [recurring, setRecurring] = useState(false);
  const [notes, setNotes] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const BASE =import.meta.env.VITE_BACKEND_URL as string;
  const authHeader = () => {
    const t = localStorage.getItem("token") || "";
    return { Authorization: t.startsWith("Bearer") ? t : `Bearer ${t}` };
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/category.csv");
        if (!resp.ok) return;
        const text = await resp.text();
        const lines = text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        const cats = lines.slice(1);
        setAllCategories(cats);
      } catch (e) {}
    })();
  }, []);

  const handleAddExpense = async () => {
    if (!title || !category || amount === "" || isNaN(Number(amount))) return;

    try {
      const payload = {
        title,
        category,
        amount: Number(amount),
        recurring,
        notes: notes || undefined,
      };

      const res = await axios.post(
        `${BASE.replace(/\/$/, "")}/api/v1/expense/create`,
        payload,
        { headers: { "Content-Type": "application/json", ...authHeader() } }
      );

      const returned = res.data?.newExpense ?? res.data;
      const newExpense: Expense = {
        _id: returned?._id ?? returned?.id,
        title: returned?.title ?? payload.title,
        category: returned?.category ?? payload.category,
        amount: Number(returned?.amount ?? payload.amount),
        date: returned?.date
          ? new Date(returned.date).toLocaleDateString()
          : new Date().toLocaleDateString(),
        recurring: returned?.recurring ?? payload.recurring,
        notes: returned?.notes ?? payload.notes,
      };

      setExpenses((prev) => [newExpense, ...prev]);
      setTitle("");
      setCategory("");
      setAmount("");
      setRecurring(false);
      setNotes("");
      setIsOpen(false);
    } catch (err) {
      console.error("Add expense failed", err);
    }
  };

  return (
   <div className="w-full p-3 sm:p-6 flex items-center justify-between gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
    

    <div className="flex-shrink-0 px-2 sm:px-6">
      <Link to={"/"}>
        <div className="font-bold text-lg sm:text-2xl tracking-tight flex items-center whitespace-nowrap">
          <span className="text-white border-2 border-white px-1.5 sm:px-2 rounded mr-1">
            E
          </span>
          <span className="text-white">xpensio</span>
        </div>
      </Link>
    </div>


    <div className="flex flex-nowrap items-center justify-end gap-2 sm:gap-5 overflow-x-auto no-scrollbar">
      <Link to={"/dashboard"}>
        <button className="font-semibold text-sm sm:text-base text-white hover:text-gray-300 transition duration-200 whitespace-nowrap">
          Dashboard
        </button>
      </Link>

      <Link to={"/allexpense"}>
        <button className="font-semibold text-sm sm:text-base text-white hover:text-gray-300 transition duration-200 whitespace-nowrap">
          History
        </button>
      </Link>

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 sm:gap-2 bg-[#1e1e1e] border border-[#282828] rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-white text-sm sm:text-base font-medium hover:bg-[#282828] transition whitespace-nowrap"
      >
        <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#26e07f] text-black font-bold text-xs sm:text-sm">
          +
        </span>
        Add Expense
      </button>

      <button
        onClick={handleLogout}
        className="px-3 sm:px-5 py-1 sm:py-2 rounded-full font-semibold text-sm sm:text-base bg-[#171717] border border-[#282828] text-white focus:ring-2 focus:ring-gray-500 hover:shadow-xl hover:scale-105 transition-all duration-200 whitespace-nowrap"
      >
        Logout
      </button>
    </div>
 



   
    {isOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#171717] border border-[#282828] rounded-2xl p-6 w-[90%] max-w-md">
          <h3 className="text-lg font-semibold text-white mb-4">
            Add New Expense
          </h3>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none"
            />

            {allCategories.length > 0 ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border border-[#282828] rounded p-2 text-white focus:outline-none"
              >
                <option value="">Select category</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none"
              />
            )}

            <input
              type="number"
              placeholder="Amount"
              value={amount === "" ? "" : amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none"
            />

            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="accent-[#26e07f]"
              />
              Recurring expense
            </label>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 rounded-lg bg-[#26e07f] text-black font-semibold hover:bg-[#2df08c] transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
