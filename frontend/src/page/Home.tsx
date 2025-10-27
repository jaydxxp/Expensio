import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen -mt-32">
        <div className="font-normal text-6xl text-center mb-8">
          Earn, spend, repeat, <br></br>
          we'll keep it all organized.
        </div>
        <div>
          <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
            <button className="px-5 py-2 items-center rounded-full font-semibold bg-[#171717] border border-[#282828] text-white focus:ring-2 focus:ring-gray-500 hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
