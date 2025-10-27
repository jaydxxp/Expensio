import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen -mt-32 px-4 text-center">
        

        <div className="font-normal text-3xl sm:text-6xl text-center mb-8 ">
          Earn, spend, repeat, <br/>
          we'll keep it all organized.
        </div>


        <div>
          <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
            <button className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold bg-[#171717] border border-[#282828] text-white text-sm sm:text-base focus:ring-2 focus:ring-gray-500 hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
