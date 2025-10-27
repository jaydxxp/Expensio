import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 pb-35">
        <div className="max-w-3xl text-center mb-12">
          <h2 className="text-6xl font-bold text-white mb-6">About Us</h2>
          <div className="bg-[#171717] border border-[#282828] rounded-3xl p-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Expensio is your trusted companion for managing finances
              effortlessly. We believe in making money management simple,
              intuitive and accessible for everyone. Track your expenses,
              monitor your income and achieve your financial goals with ease.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <div className="flex flex-col items-center bg-linear-to-br bg-[#171717] border border-[#282828] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="bg-[#171717] border border-[#282828] rounded-full p-5 mb-4">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                fill="none"
              >
                <rect
                  x="6.9608"
                  y="13.065"
                  width="7.5178"
                  height="21.87"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="20.7926"
                  y="18.5325"
                  width="7.5178"
                  height="16.4025"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="34.994"
                  y="27.4172"
                  width="7.5178"
                  height="7.5178"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 34.9237L18.7938 23.4332L31.2701 27.9308L43.5 18.5043"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Easy Tracking</h3>
            <p className="text-gray-300 text-center text-sm">
              Keep track of all your expenses and income in one place with our
              intuitive interface.
            </p>
          </div>

          <div className="flex flex-col items-center bg-[#171717] border border-[#282828] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="bg-[#171717] border border-[#282828] rounded-full p-5 mb-4">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                className="w-10 h-10 text-white"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <defs>
                    {" "}
                    <clipPath id="clip-insights">
                      {" "}
                      <rect width="32" height="32"></rect>{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                  <g id="insights" clipPath="url(#clip-insights)">
                    {" "}
                    <g
                      id="Group_1718"
                      data-name="Group 1718"
                      transform="translate(-208 -468)"
                    >
                      {" "}
                      <g id="Group_1717" data-name="Group 1717">
                        {" "}
                        <g id="Group_1716" data-name="Group 1716">
                          {" "}
                          <path
                            id="Path_3714"
                            data-name="Path 3714"
                            d="M235.9,471.449a3.524,3.524,0,0,0-2.594,5.925l-4.357,7.284a3.53,3.53,0,0,0-.877-.123,3.492,3.492,0,0,0-1.68.444l-3.372-3.372a3.488,3.488,0,0,0,.444-1.679,3.538,3.538,0,1,0-6.131,2.387l-4.358,7.284a3.477,3.477,0,0,0-.877-.123,3.568,3.568,0,1,0,2.594,1.15l4.357-7.284a3.53,3.53,0,0,0,.877.123,3.492,3.492,0,0,0,1.68-.444l3.372,3.372a3.488,3.488,0,0,0-.444,1.679,3.538,3.538,0,1,0,6.131-2.386l4.358-7.285a3.477,3.477,0,0,0,.877.123,3.537,3.537,0,1,0,0-7.075Zm-23.8,23.1a1.537,1.537,0,1,1,1.538-1.537A1.54,1.54,0,0,1,212.1,494.551Zm6.291-14.623a1.537,1.537,0,1,1,1.537,1.537A1.54,1.54,0,0,1,218.39,479.928Zm9.683,9.682a1.537,1.537,0,1,1,0-3.075,1.517,1.517,0,0,1,.777.219l.008.007.024.01a1.534,1.534,0,0,1-.809,2.839Zm7.828-13.086a1.517,1.517,0,0,1-.778-.219l-.007-.006-.014-.005a1.53,1.53,0,1,1,.8.23Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Smart Insights
            </h3>
            <p className="text-gray-300 text-center text-sm">
              Get detailed analytics and insights about your spending patterns
              and financial habits.
            </p>
          </div>

          <div className="flex flex-col items-center bg-[#171717] border border-[#282828] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className=" bg-[#171717] border border-[#282828] rounded-full p-5 mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.4472 1.10557C12.1657 0.964809 11.8343 0.964809 11.5528 1.10557L3.55279 5.10557C3.214 5.27496 3 5.62123 3 6V12C3 14.6622 3.86054 16.8913 5.40294 18.7161C6.92926 20.5218 9.08471 21.8878 11.6214 22.9255C11.864 23.0248 12.136 23.0248 12.3786 22.9255C14.9153 21.8878 17.0707 20.5218 18.5971 18.7161C20.1395 16.8913 21 14.6622 21 12V6C21 5.62123 20.786 5.27496 20.4472 5.10557L12.4472 1.10557ZM5 12V6.61803L12 3.11803L19 6.61803V12C19 14.1925 18.305 15.9635 17.0696 17.425C15.8861 18.8252 14.1721 19.9803 12 20.9156C9.82786 19.9803 8.11391 18.8252 6.93039 17.425C5.69502 15.9635 5 14.1925 5 12ZM16.7572 9.65323C17.1179 9.23507 17.0714 8.60361 16.6532 8.24284C16.2351 7.88207 15.6036 7.9286 15.2428 8.34677L10.7627 13.5396L8.70022 11.5168C8.30592 11.1301 7.67279 11.1362 7.28607 11.5305C6.89935 11.9248 6.90549 12.5579 7.29978 12.9446L10.1233 15.7139C10.3206 15.9074 10.5891 16.0106 10.8651 15.9991C11.1412 15.9876 11.4002 15.8624 11.5807 15.6532L16.7572 9.65323Z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Secure & Private
            </h3>
            <p className="text-gray-300 text-center text-sm">
              Your financial data is encrypted and secure. We prioritize your
              privacy above everything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
