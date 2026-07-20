import { useNavigate } from "react-router-dom";
import { Input, SocialBtn, Divider } from "../components/AuthShared";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext"; // 1. Import your auth hook

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      alert("Login Successfully");

      // 5. Redirect the user so they don't get stuck staring at the login form
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fdf9f5] via-[#f5ede0] to-[#ede0cc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#ede5da] overflow-hidden">
        <div className="h-1 bg-linear-to-r from-[#C9B194] via-[#e8d5bb] to-[#C9B194]" />
        <div className="px-8 py-9">
          <a
            href="/"
            className="block text-center text-[#C9B194] text-3xl font-bold mb-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            UrbanMart
          </a>
          <p className="text-center text-gray-400 text-[13px] mb-8">
            Welcome back — sign in to your account
          </p>

          <div className="flex gap-3 mb-5">
            <SocialBtn>Google</SocialBtn>
            <SocialBtn>Facebook</SocialBtn>
          </div>

          <Divider />

          <form className="flex flex-col gap-4 mt-1" onSubmit={submitHandler}>
            <Input
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#C9B194]" />
                <span className="text-[12px] text-gray-500">Remember me</span>
              </label>
              <a href="#" className="text-[12px] text-[#C9B194] font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-1 w-full bg-[#1a1a1a] hover:bg-[#C9B194] text-white font-medium py-3.5 rounded-xl text-[14px] transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-400 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#C9B194] hover:text-[#9a7f5e] font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
