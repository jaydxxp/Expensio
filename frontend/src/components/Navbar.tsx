import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isSigninPage = location.pathname === "/signin";

  return (
    <div className="w-full p-3 sm:p-6 flex flex-row justify-between items-center gap-2 sm:gap-6 flex-wrap">
      
   
      <div className="px-2 sm:px-6 flex justify-start">
        <Link to={"/"}>
          <div className="font-bold text-xl sm:text-2xl tracking-tight flex items-center">
            <span className="text-white border-2 border-white px-1.5 sm:px-2 rounded mr-1">
              E
            </span>
            <span className="text-white">xpensio</span>
          </div>
        </Link>
      </div>

      
      <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-end">
        <Link to={"/about"}>
          <button className="font-semibold text-white hover:text-gray-300 transition duration-200 text-sm sm:text-base">
            About
          </button>
        </Link>

        <Link to={isSigninPage ? "/signup" : "/signin"}>
          <button className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold bg-[#171717] border border-[#282828] text-white focus:ring-2 focus:ring-gray-500 hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base">
            {isSigninPage ? "Signup" : "Signin"}
          </button>
        </Link>
      </div>
    </div>
  );
}
