
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isSigninPage = location.pathname === "/signin";
  return (
    <div className="flex justify-between items-center p-8">
      <div className="px-6 py-2">
        <Link to={"/"}>
          <div className="font-bold text-2xl tracking-tight flex">
            <span className="text-white border-2 border-white px-2 rounded mr-1">
              E
            </span>
            <span className="text-white">xpensio</span>
          </div>
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to={"/about"}>
          <button className="font-semibold text-white hover:text-gray-300 transition duration-200">
            About
          </button>
        </Link>

        <Link to={isSigninPage ? "/signup" : "/signin"}>
          <button className="px-5 py-2 rounded-full font-semibold bg-[#171717] border border-[#282828] text-white focus:ring-2 focus:ring-gray-500 hover:shadow-xl hover:scale-105 transition-all duration-200">
            {isSigninPage ? "Signup" : "Signin"}
          </button>
        </Link>
      </div>
    </div>
  );
}
