import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

interface Signininput {
  email?: string;
  password?: string;
}
export default function SigninComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputfields, setinputfields] = useState<Signininput>({
    email: "",
    password: "",
  });
  const Backendurl = import.meta.env.VITE_BACKEND_URL;

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(Backendurl);
      const response = await axios.post(
        `${Backendurl}/api/v1/auth/signin`,
        inputfields
      );
      const jwt = response.data.jwt || response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Authentication failed. Please try again."
      );
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-7 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setinputfields({ ...inputfields, email: e.target.value })
                }
                autoComplete="email"
                placeholder="Enter your email"
                className="block w-full rounded-md bg-[#1d1d1d] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                onChange={(e) =>
                  setinputfields({ ...inputfields, password: e.target.value })
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                className="block w-full rounded-md bg-[#1d1d1d] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={HandleSubmit}
              className="flex w-full justify-center rounded-md bg-[#171717] border border-[#282828] px-3 py-1.5 text-sm/6 font-semibold text-white hover:shadow-xl hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not registered yet?
          <a
            href="/signup"
            className="font-semibold text-gray-200 hover:text-white transition duration-200"
          >
            {" "}
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
