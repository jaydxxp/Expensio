import React, { useState, useEffect } from "react";
import axios from "axios";

interface RateMap {
  [key: string]: number;
}

interface CurrencyWidgetProps {
  isOpen: boolean;
}

const CurrencyWidget: React.FC<CurrencyWidgetProps> = ({ isOpen }) => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [converted, setConverted] = useState<number>(0);
  const [rates, setRates] = useState<RateMap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "INR",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "MXN",
    "SGD",
    "HKD",
    "NOK",
    "KRW",
  ];

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );

      if (response.data && response.data.rates) {
        setRates(response.data.rates);
      }
    } catch (err) {
      console.error("Error fetching rates:", err);
      setError("Failed to fetch rates");

      setRates({
        USD: 1,
        EUR: 0.93,
        GBP: 0.79,
        INR: 83.12,
        JPY: 150.55,
        AUD: 1.52,
        CAD: 1.36,
        CHF: 0.88,
        CNY: 7.24,
        SEK: 10.87,
        NZD: 1.67,
        MXN: 17.12,
        SGD: 1.34,
        HKD: 7.83,
        NOK: 10.93,
        KRW: 1342.5,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRates();
    }
  }, [isOpen, from]);

  useEffect(() => {
    if (rates[to]) {
      const result = amount * rates[to];
      setConverted(parseFloat(result.toFixed(2)));
    }
  }, [amount, to, rates]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-5 flex flex-col items-end z-50">
      <div className="w-80 rounded-lg bg-[#171717] border border-[#282828] p-4 shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-200 text-lg font-medium">
            Currency Converter
          </h2>
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#26e07f] border-t-transparent"></div>
          )}
        </div>

        {error && (
          <div className="text-xs text-red-400 mb-3 text-center">{error}</div>
        )}

        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-32 bg-transparent border border-[#282828] text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#26e07f] text-right text-sm"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 bg-[#1e1e1e] border border-[#282828] text-white rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#26e07f] cursor-pointer text-sm"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center my-2">
          <button
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            className="bg-[#1e1e1e] border border-[#282828] rounded-full p-1.5 hover:bg-[#282828] transition"
            title="Swap currencies"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#26e07f"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 items-center mb-3">
          <input
            type="text"
            value={converted.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            readOnly
            className="w-32 bg-transparent border border-[#282828] text-white px-3 py-2 rounded text-right text-sm"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 bg-[#1e1e1e] border border-[#282828] text-white rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#26e07f] cursor-pointer text-sm"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {rates[to] && (
          <div className="text-xs text-gray-400 text-center">
            1 {from} = {rates[to].toFixed(4)} {to}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyWidget;
