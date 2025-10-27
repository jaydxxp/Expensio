import { useEffect, useMemo, useState } from "react";
import Logbar from "../components/Logbar";
import UtilitiesRibbon from "../components/Utilities";
import CalculatorWidget from "../components/Calculator";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import ExpenseCard from "../components/AnimatedExpense";
import TopCategoryCard from "../components/AnimatedCate";
import RecurringExpensesCard from "../components/AnimateRecurring";
import AverageDailySpendCard from "../components/AnimatedSpend";
import CurrencyWidget from "../components/CurrencyConvert";
import AIExpenseAssistant from "../components/AIAssistant";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

type Expense = {
  _id?: string;
  title: string;
  category: string;
  date?: string;
  amount: number;
  recurring?: boolean;
  notes?: string;
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const handleWidgetToggle = (widgetName: string) => {
    setActiveWidget((prev) => (prev === widgetName ? null : widgetName));
  };

  const BASE = import.meta.env.VITE_BACKEND_URL as string;
  const authHeader = () => {
    const t = localStorage.getItem("token") || "";
    return { Authorization: t.startsWith("Bearer") ? t : `Bearer ${t}` };
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE.replace(/\/$/, "")}/api/v1/expense/allexpense`, {
          headers: { "Content-Type": "application/json", ...authHeader() },
        });
        const raw: Expense[] = res.data?.allExpense ?? res.data ?? [];
        const normalized = raw.map((r: any) => ({
          ...r,
          amount: Number(r.amount ?? 0),
          date: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
        }));
        setExpenses(normalized);
      } catch (err) {
        console.error("Failed to load expenses", err);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const summary = useMemo(() => {
    const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    const recurringTotal = expenses.filter((e) => e.recurring).reduce((s, e) => s + (e.amount || 0), 0);

    const catMap = new Map<string, number>();
    expenses.forEach((e) => {
      const cat = e.category ?? "Uncategorized";
      catMap.set(cat, (catMap.get(cat) || 0) + (e.amount || 0));
    });

    let topCategory = { name: "—", amount: 0 };
    for (const [k, v] of catMap.entries()) {
      if (v > topCategory.amount) topCategory = { name: k, amount: v };
    }


    let avgDaily = 0;
    if (expenses.length > 0) {
      const times = expenses.map((e) => new Date(e.date ?? Date.now()).getTime()).sort();
      const days = Math.max(1, Math.round((times[times.length - 1] - times[0]) / (1000 * 60 * 60 * 24)));
      avgDaily = Math.round((totalExpenses / days) * 100) / 100;
    }

    return { totalExpenses, recurringTotal, topCategory, avgDaily, catMap };
  }, [expenses]);

  
  const lineData = useMemo(() => {
    const months = 6;
    const now = new Date();
    const labels: string[] = [];
    const keys: string[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(d.toLocaleString(undefined, { month: "short" }));
      keys.push(`${d.getFullYear()}-${d.getMonth() + 1}`);
    }
    const totals = new Array(months).fill(0);
    expenses.forEach((e) => {
      const dt = new Date(e.date ?? "");
      const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
      const idx = keys.indexOf(key);
      if (idx >= 0) totals[idx] += e.amount || 0;
    });
    return {
      labels,
      datasets: [
        {
          label: "Monthly expenses",
          data: totals.map((v) => Math.round(v * 100) / 100),
          borderColor: "#EF4444",
          backgroundColor: "rgba(239,68,68,0.12)",
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    };
  }, [expenses]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1800,
      easing: "linear" as const,
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9CA3AF" } },
      y: { grid: { color: "#374151" }, ticks: { color: "#9CA3AF" } },
    },
  };

 
  const doughnutData = useMemo(() => {
    const labels = Array.from(summary.catMap.keys());
    const data = Array.from(summary.catMap.values()).map((v) => Math.round(v * 100) / 100);
    const colors = ["#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#A78BFA", "#06B6D4", "#F472B6"];
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          hoverOffset: 6,
        },
      ],
    };
  }, [summary.catMap]);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const, labels: { color: "#9CA3AF", boxWidth: 10 } },
      tooltip: { callbacks: { label: (ctx: any) => `${ctx.label}: $${ctx.raw}` } },
    },
  };

  return (
    <div className="">
      <Logbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExpenseCard totalExpenses={summary.totalExpenses} />
          <TopCategoryCard amount={summary.topCategory.amount} />
          <RecurringExpensesCard recurringTotal={summary.recurringTotal} />
          <AverageDailySpendCard avgDaily={summary.avgDaily} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pt-4">
          <div className="bg-[#171717] border border-[#282828] rounded-3xl p-6 min-h-[380px]">
            <h3 className="text-xl font-bold text-white mb-6">Expense Graph</h3>
            <div className="h-72">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          <div className="bg-[#171717] border border-[#282828] rounded-3xl p-6 min-h-[380px]">
            <h3 className="text-xl font-bold text-white mb-6">Spending by Category</h3>
            <div className="h-72 max-w-sm mx-auto">
              {Array.from(summary.catMap.keys()).length ? (
                <Doughnut data={doughnutData} options={doughnutOptions} />
              ) : (
                <p className="text-gray-400 text-sm">No category data</p>
              )}
            </div>
          </div>
        </div>
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