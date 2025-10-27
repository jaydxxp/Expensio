import Logbar from "../components/Logbar";
import RecentExpense from "../components/Recent";

export default function AllExpense() {
  return (
    <div className="">
      <Logbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <RecentExpense />
      </div>
    </div>
  );
}
