import  { useEffect, useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import UtilitiesRibbon from "./Utilities";
import AIExpenseAssistant from "./AIAssistant";
import CalculatorWidget from "./Calculator";
import CurrencyWidget from "./CurrencyConvert";

interface Expense {
  _id?: string;
  title: string;
  category: string;
  date?: string;
  amount: number;
  recurring: boolean;
  notes?: string;
}

export default function RecentExpense() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const handleWidgetToggle = (widgetName: string) => {
    setActiveWidget((prev) => (prev === widgetName ? null : widgetName));
  };
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");


  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Partial<Expense>>({});

  const [allCategories, setAllCategories] = useState<string[]>([]);

  const BASE = import.meta.env.VITE_BACKEND_URL as string;
  const authHeader = () => {
    const t = localStorage.getItem("token") || "";
    return { Authorization: t.startsWith("Bearer") ? t : `Bearer ${t}` };
  };

  useEffect(() => {
    fetchExpenses();

    (async () => {
      try {
        const resp = await fetch("/category.csv");
        if (!resp.ok) return;
        const text = await resp.text();
        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    
        const cats = lines.slice(1);
        setAllCategories(cats);
      } catch (e) {
       
      }
    })();

  }, []);

  async function fetchExpenses() {
    try {
      const res = await axios.get(`${BASE.replace(/\/$/, "")}/api/v1/expense/allexpense`, {
        headers: { "Content-Type": "application/json", ...authHeader() },
      });
      const data: Expense[] = (res.data?.allExpense ?? res.data ?? []).map((e: any) => ({
        ...e,
        amount: Number(e.amount ?? 0),
        date: e.date ? new Date(e.date).toLocaleDateString() : undefined,
      }));
      setExpenses(data);
    } catch (err) {
      console.error("failed to fetch expenses", err);
    }
  }

  
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
      const newExpense: Expense = {
        ...(res.data?.newExpense ?? res.data),
        amount: Number(res.data?.newExpense?.amount ?? payload.amount),
        date: res.data?.newExpense?.date ? new Date(res.data.newExpense.date).toLocaleDateString() : new Date().toLocaleDateString(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      setTitle("");
      setCategory("");
      setAmount("");
      setRecurring(false);
      setNotes("");
      setIsOpen(false);
    } catch (err) {
      console.error("add expense failed", err);
    }
  };

 
  function startEdit(exp: Expense) {
    setEditingId(exp._id ?? null);
    setEditFields({
      title: exp.title,
      category: exp.category,
      amount: exp.amount,
      recurring: exp.recurring,
      notes: exp.notes,
    });
  }


  async function saveEdit() {
    if (!editingId) return;

    try {
      const payload: any = {
        title: editFields.title,
        category: editFields.category,
        amount: editFields.amount !== undefined ? Number(editFields.amount) : undefined,
        recurring: editFields.recurring,
        notes: editFields.notes,
      };
 
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      const res = await axios.put(
        `${BASE.replace(/\/$/, "")}/api/v1/expense/update/${editingId}`,
        payload,
        { headers: { "Content-Type": "application/json", ...authHeader() } }
      );

      const updated: Expense = {
        ...(res.data?.updatedExpense ?? res.data),
        amount: Number(res.data?.updatedExpense?.amount ?? payload.amount ?? 0),
        date: res.data?.updatedExpense?.date ? new Date(res.data.updatedExpense.date).toLocaleDateString() : undefined,
      };

      setExpenses((prev) => prev.map((ex) => ((ex._id ?? "") === editingId ? updated : ex)));
      setEditingId(null);
      setEditFields({});
    } catch (err) {
      console.error("update failed", err);
    }
  }


  async function handleDelete(id?: string) {
    if (!id) return;
    try {
      await axios.delete(`${BASE.replace(/\/$/, "")}/api/v1/expense/delete/${id}`, {
        headers: { ...authHeader() },
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("delete failed", err);
    }
  }

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(expenses.map((exp) => exp.category)))];


  const exportCSV = () => {
    const headers = ["Title", "Category", "Date", "Amount", "Recurring"];
    const rows = expenses.map((exp) => [
      exp.title,
      exp.category,
      exp.date ?? "",
      exp.amount.toString(),
      exp.recurring ? "Yes" : "No",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Expenses Report", 14, 15);

    const rows = expenses.map((exp) => [exp.title, exp.category, exp.date ?? "", `$${exp.amount}`, exp.recurring ? "Yes" : "No"]);
    let startY = 25;
    doc.setFontSize(10);
    rows.forEach((row, index) => {
      row.forEach((cell, i) => {
        doc.text(`${cell}`, 14 + i * 35, startY + index * 8);
      });
    });

    doc.save("expenses.pdf");
  };

  return (
    <div>
      <div className="bg-[#171717] border border-[#282828] rounded-3xl p-6 relative">
     
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="text-xl font-bold text-white">Recent Expenses</h3>

          <div className="flex items-center gap-3">
           
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1e1e1e] border border-[#282828] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#26e07f] transition h-8"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777" className="w-4 h-4 absolute left-2 top-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>

            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-[#1e1e1e] border border-[#282828] rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#26e07f] transition h-8">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

           
            <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-[#1e1e1e] border border-[#282828] rounded-lg px-3 py-1.5 text-white text-sm font-medium hover:bg-[#282828] transition">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#26e07f] text-black font-bold text-sm">+</span>
              Add Expense
            </button>

        
            <div className="relative group">
              <button className="flex items-center gap-2 bg-[#1e1e1e] border border-[#282828] rounded-lg px-3 py-1.5 text-white text-sm font-medium hover:bg-[#282828] transition">
                <img width="20" height="15" src="https://img.icons8.com/windows/32/FFFFFF/share-rounded.png" alt="share-rounded" />
                Share
              </button>

              
              <div className="absolute right-0 mt-1 w-40 bg-[#171717] border border-[#282828] rounded-lg shadow-lg z-50 hidden group-hover:block">
                <button onClick={() => exportCSV()} className="w-full text-left px-4 py-2 text-white hover:bg-[#282828] transition">Export CSV</button>
                <button onClick={() => exportPDF()} className="w-full text-left px-4 py-2 text-white hover:bg-[#282828] transition">Export PDF</button>
              </div>
            </div>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold pb-4">Description</th>
                <th className="text-left text-gray-400 font-semibold pb-4">Category</th>
                <th className="text-left text-gray-400 font-semibold pb-4">Date</th>
                <th className="text-right text-gray-400 font-semibold pb-4">Amount</th>
                <th className="text-right text-gray-400 font-semibold pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp._id ?? `${exp.title}-${exp.amount}`} className="border-b border-gray-800">
                  <td className="py-4 text-white">{exp.title}</td>
                  <td className="py-4 text-gray-300">{exp.category}</td>
                  <td className="py-4 text-gray-300">{exp.date}</td>
                  <td className="py-4 text-right text-white font-semibold">${exp.amount}</td>
                  <td className="py-4 text-right">
                    <button onClick={() => startEdit(exp)} className="text-gray-400 hover:text-white mr-3 transition px-3 py-1 rounded-lg hover:bg-gray-700">Edit</button>
                    <button onClick={() => handleDelete(exp._id)} className="text-gray-400 hover:text-red-400 transition px-3 py-1 rounded-lg hover:bg-gray-700">Delete</button>
                  </td>
                </tr>
              ))}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#171717] border border-[#282828] rounded-2xl p-6 w-[90%] max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Expense</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />

                
                {allCategories.length > 0 ? (
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent border border-[#282828] rounded p-2 text-white focus:outline-none">
                    <option value="">Select category</option>
                    {allCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                )}

                <input type="number" placeholder="Amount" value={amount === "" ? "" : amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                <input type="text" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="accent-[#26e07f]" />
                  Recurring expense
                </label>
              </div>

      
              <div className="flex justify-end mt-6 gap-3">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-gray-300 transition">Cancel</button>
                <button onClick={handleAddExpense} className="px-4 py-2 rounded-lg bg-[#26e07f] text-black font-semibold hover:bg-[#2df08c] transition">Add</button>
              </div>
            </div>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#171717] border border-[#282828] rounded-2xl p-6 w-[90%] max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Expense</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Title" value={editFields.title ?? ""} onChange={(e) => setEditFields({ ...editFields, title: e.target.value })} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />

           
                {allCategories.length > 0 ? (
                  <select value={editFields.category ?? ""} onChange={(e) => setEditFields({ ...editFields, category: e.target.value })} className="bg-transparent border border-[#282828] rounded p-2 text-white focus:outline-none">
                    <option value="">Select category</option>
                    {allCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input type="text" placeholder="Category" value={editFields.category ?? ""} onChange={(e) => setEditFields({ ...editFields, category: e.target.value })} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                )}

                <input type="number" placeholder="Amount" value={editFields.amount ?? ""} onChange={(e) => setEditFields({ ...editFields, amount: e.target.value === "" ? undefined : Number(e.target.value) })} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                <input type="text" placeholder="Notes" value={editFields.notes ?? ""} onChange={(e) => setEditFields({ ...editFields, notes: e.target.value })} className="bg-transparent border border-[#282828] rounded p-2 text-white placeholder-gray-500 focus:outline-none" />
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" checked={Boolean(editFields.recurring)} onChange={(e) => setEditFields({ ...editFields, recurring: e.target.checked })} className="accent-[#26e07f]" />
                  Recurring expense
                </label>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button onClick={() => { setEditingId(null); setEditFields({}); }} className="px-4 py-2 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-gray-300 transition">Cancel</button>
                <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-[#26e07f] text-black font-semibold hover:bg-[#2df08c] transition">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
            <UtilitiesRibbon
        onOpenAI={() => handleWidgetToggle("ai")} 
        onOpenCalculator={() => handleWidgetToggle("calculator")} 
        onOpenCurrency={() => handleWidgetToggle("currency")}
        activeWidget={activeWidget}
      />

    
      <AIExpenseAssistant isOpen={activeWidget === "ai"} />
      <CalculatorWidget isOpen={activeWidget === "calculator"} />
      <CurrencyWidget isOpen={activeWidget === "currency"} />
    </div>
  );
}
