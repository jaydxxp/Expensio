import { useEffect, useState } from "react";

interface CalculatorWidgetProps {
  isOpen: boolean;
}

const CalculatorWidget: React.FC<CalculatorWidgetProps> = ({ isOpen }) => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const formatExpression = (expr: string): string =>
    expr.replace(/÷/g, "/").replace(/×/g, "*").replace(/%/g, "/100");

  useEffect(() => {
    if (!input.trim()) {
      setResult("");
      return;
    }
    try {
      const evalResult = eval(formatExpression(input));
      if (!isNaN(evalResult)) setResult(evalResult.toString());
    } catch {
      setResult("");
    }
  }, [input]);

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = eval(formatExpression(input));
        setInput(evalResult.toString());
        setResult("");
      } catch {
        setInput("Error");
        setResult("");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="],
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-5 flex flex-col items-end z-50">
      <div className="mb-3 w-64 rounded-lg bg-[#171717] border border-[#282828] p-4 shadow-xl transition-all duration-300">
        <div className="flex flex-col mb-3">
          <input
            type="text"
            value={input}
            readOnly
            className="w-full text-right bg-transparent text-white border border-[#282828] rounded p-2 text-lg focus:outline-none"
          />
          {result && (
            <div className="text-right text-gray-400 text-sm mt-1">
              = {result}
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`py-2 rounded text-lg transition ${
                ["÷", "×", "-", "+", "="].includes(btn)
                  ? "bg-[#282828] hover:bg-[#333333] text-white"
                  : btn === "C"
                  ? "bg-[#2a2a2a] hover:bg-[#333333] text-red-400"
                  : "bg-[#1e1e1e] hover:bg-[#282828] text-white"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorWidget;
