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
            <div className="bg-[#171717] border border-[#282828] rounded-full p-5 mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-3">Easy Tracking</h3>
            <p className="text-gray-300 text-center text-sm">
              Keep track of all your expenses and income in one place with our
              intuitive interface.
            </p>
          </div>

          <div className="flex flex-col items-center bg-[#171717] border border-[#282828] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="bg-[#171717] border border-[#282828] rounded-full p-5 mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-3">
              Smart Insights
            </h3>
            <p className="text-gray-300 text-center text-sm">
              Get detailed analytics and insights about your spending patterns
              and financial habits.
            </p>
          </div>

          <div className="flex flex-col items-center bg-[#171717] border border-[#282828] rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className=" bg-[#171717] border border-[#282828] rounded-full p-5 mb-4"></div>
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
