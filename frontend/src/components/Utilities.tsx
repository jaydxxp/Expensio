import { useState } from "react";

interface Props {
  onOpenAI: () => void;
  onOpenCalculator: () => void;
  onOpenCurrency: () => void;
  activeWidget?: string | null; 
}

export default function UtilitiesRibbon({
  onOpenAI,
  onOpenCalculator,
  onOpenCurrency,
  activeWidget,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 flex items-center z-50">
      <div className="flex items-center space-x-3 mr-3">
        <div
          className={`flex space-x-3 transition-all duration-300 ${
            open
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5 pointer-events-none"
          }`}
        >
        
          <button
            onClick={onOpenAI}
            className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg transition-all ${
              activeWidget === "ai"
                ? "bg-[#26e07f] border-[#26e07f]"
                : "bg-[#1e1e1e] border-[#282828] hover:bg-[#282828]"
            }`}
            title="AI Bot"
          >
            <svg fill={activeWidget === "ai" ? "#000000" : "#ffffff"} width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xmlSpace="preserve">
              <path d="M49.6,25.8c7.2,0,13,5.8,13,13v3.3c-4.3-0.5-8.7-0.7-13-0.7c-4.3,0-8.7,0.2-13,0.7v-3.3 C36.6,31.7,42.4,25.8,49.6,25.8z"></path>
              <path d="M73.2,63.8l1.3-11.4c2.9,0.5,5.1,2.9,5.1,5.6C79.6,61.2,76.7,63.8,73.2,63.8z"></path>
              <path d="M25.9,63.8c-3.5,0-6.4-2.6-6.4-5.8c0-2.8,2.2-5.1,5.1-5.6L25.9,63.8z"></path>
              <path d="M68.7,44.9c-6.6-0.7-12.9-1-19-1c-6.1,0-12.5,0.3-19,1h0c-2.2,0.2-3.8,2.2-3.5,4.3l2,19.4 c0.2,1.8,1.6,3.3,3.5,3.5c5.6,0.7,11.3,1,17.1,1s11.5-0.3,17.1-1c1.8-0.2,3.3-1.7,3.5-3.5l2-19.4v0C72.4,47,70.9,45.1,68.7,44.9z M38.6,62.5c-1.6,0-2.8-1.6-2.8-3.7s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S40.2,62.5,38.6,62.5z M55.3,66.6c0,0.2-0.1,0.4-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2h-9.9c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5v-1.8c0-0.4,0.3-0.7,0.7-0.7h0.2 c0.4,0,0.7,0.3,0.7,0.7v0.9h8.1v-0.9c0-0.4,0.3-0.7,0.7-0.7h0.2c0.4,0,0.7,0.3,0.7,0.7V66.6z M60.6,62.5c-1.6,0-2.8-1.6-2.8-3.7 s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S62.2,62.5,60.6,62.5z"></path>
            </svg>
          </button>

       
          <button
            onClick={onOpenCalculator}
            className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg transition-all ${
              activeWidget === "calculator"
                ? "bg-[#26e07f] border-[#26e07f]"
                : "bg-[#1e1e1e] border-[#282828] hover:bg-[#282828]"
            }`}
            title="Calculator"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="26"
              height="26"
              xmlns="http://www.w3.org/2000/svg"
              stroke={activeWidget === "calculator" ? "#000000" : "#ffffff"}
            >
              <path
                d="M5 9H19M15 18V15M9 18H9.01M12 18H12.01M12 15H12.01M9 15H9.01M15 12H15.01M12 12H12.01M9 12H9.01M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.07989 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

    
          <button
            onClick={onOpenCurrency}
            className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-lg transition-all ${
              activeWidget === "currency"
                ? "bg-[#26e07f] border-[#26e07f]"
                : "bg-[#1e1e1e] border-[#282828] hover:bg-[#282828]"
            }`}
            title="Currency Converter"
          >
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000">
              <path d="M4.977 7c.026.001.649.039 1.316.707a.999.999 0 101.414-1.414A4.491 4.491 0 006 5.2V5a1 1 0 10-2 0v.185A2.995 2.995 0 002 8c0 2.281 1.727 2.713 2.758 2.971C5.873 11.249 6 11.354 6 12c0 .552-.448 1-.976 1-.026-.001-.65-.04-1.317-.707a.999.999 0 10-1.414 1.414A4.506 4.506 0 004 14.8v.2a1 1 0 102 0v-.185A2.993 2.993 0 008 12c0-2.281-1.726-2.713-2.757-2.971C4.128 8.751 4 8.646 4 8c0-.551.449-1 .977-1zM17 13h-3.585l.292-.293a.999.999 0 10-1.414-1.414l-2 1.999a.988.988 0 00-.215.326.992.992 0 000 .764c.05.123.124.234.216.326l1.999 1.999a1 1 0 001.414-1.414L13.415 15H17a1 1 0 100-2zm-7-7a1 1 0 011-1h3.586l-.293-.293a1 1 0 011.414-1.414l1.999 1.999a.985.985 0 01.217.326.992.992 0 010 .764.985.985 0 01-.217.326l-2 1.999a.997.997 0 01-1.413 0 1 1 0 010-1.414L14.586 7H11a1 1 0 01-1-1z" fill={activeWidget === "currency" ? "#000000" : "#ffffff"} />
            </svg>
          </button>
        </div>
      </div>

      
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#171717] border border-[#282828] flex items-center justify-center text-white shadow-lg hover:bg-[#282828] transition-all"
      >
        <span className="text-xl font-bold">
          {open ? (
            <span className="text-2xl">×</span>
          ) : (
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
              <path d="m43.5,14.87c.0221-1.0104-.7791-1.8475-1.7895-1.8696-.0102-.0002-.0203-.0004-.0305-.0004h-16.91c-2-.1-5.93-4.23-8.19-4.23H6.68c-1.204-.0003-2.1803.9754-2.1806,2.1794,0,.0169.0002.0337.0006.0506h0v26c-.0111,1.2039.956,2.1889,2.1599,2.1999.0034,0,.0067,0,.0101,0h34.65c1.204,0,2.18-.9759,2.1801-2.1799,0-.0067,0-.0134,0-.0201h0V14.87Z" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="m24.4076,22.7396l1.0292,2.2456,2.2457,1.0295c.2251.1032.3239.3694.2207.5945-.0448.0976-.1231.1759-.2207.2207l-2.2457,1.0291-1.0292,2.2457c-.1031.2251-.3692.3239-.5943.2208-.0977-.0448-.176-.1231-.2208-.2208l-1.0291-2.246h0s-2.2457-1.0292-2.2457-1.0292c-.2251-.1031-.3239-.3692-.2208-.5943.0448-.0977.1231-.176.2208-.2208l2.2457-1.0292,1.0291-2.2456c.1031-.2251.3692-.3239.5943-.2208.0977.0448.176.1231.2208.2208Z" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <path d="m32.9411,28.73h0c-1.2746-.7359-1.7113-2.3658-.9754-3.6404.2339-.4051.5703-.7415.9754-.9754h0c.4505-.2601.6048-.8361.3447-1.2866h0s-1.5299-2.6497-1.5299-2.6497c-.2601-.4505-.8361-.6048-1.2866-.3448h0c-1.2746.7359-2.9045.2992-3.6404-.9754-.2339-.4051-.357-.8647-.357-1.3325h0c.0001-.5202-.4215-.942-.9417-.9421h-3.06c-.5202,0-.9419.4217-.9419.9419h0c0,1.4718-1.1931,2.665-2.6649,2.665-.4678,0-.9274-.1231-1.3325-.357h0c-.4505-.2601-1.0265-.1057-1.2866.3448l-1.5299,2.6497c-.2601.4505-.1058,1.0265.3447,1.2866h0c1.2746.7359,1.7113,2.3658.9754,3.6404-.2339.4051-.5703.7415-.9754.9754h0c-.4505.2601-.6048.8361-.3447,1.2866h0s1.5299,2.6497,1.5299,2.6497c.2601.4505.8361.6049,1.2867.3448h0c1.2746-.7359,2.9045-.2992,3.6404.9754.2339.4051.357.8647.357,1.3325h0c-.0002.5202.4214.942.9416.9422h3.0601c.5202,0,.9419-.4217.9419-.9419h0c0-1.4718,1.1931-2.6649,2.6649-2.6649.4678,0,.9273.1231,1.3325.357h0c.4505.2601,1.0265.1057,1.2866-.3447l1.5299-2.6497c.2602-.4504.106-1.0265-.3444-1.2867Z" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}