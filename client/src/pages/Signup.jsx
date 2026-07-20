import { useNavigate } from "react-router-dom";
import { Input, SocialBtn, Divider } from "../components/AuthShared";
import { useState } from "react";
import api from "../services/api";
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
} from "../../../server/src/utils/validation";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const { setUser } = useAuth();

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const newErrors = {
        name: validateFullName(name),

        email: validateEmail(email),
        password: validatePassword(password),
        confirmPassword: validateConfirmPassword(password, confirmPassword),
        terms: validateTerms(terms),
      };

      setErrors(newErrors);

      // Check if any validation failed
      if (Object.values(newErrors).some((error) => error !== "")) {
        return;
      }

      const { data } = await api.post("/auth/register", {
        name,
        lastName,
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      alert("Registration Successful");

      console.log(data);

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Registration Failed");
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
            Create your account — it's free
          </p>

          <div className="flex gap-3 mb-5">
            <SocialBtn>Google</SocialBtn>
            <SocialBtn>Facebook</SocialBtn>
          </div>

          <Divider />

          <form className="flex flex-col gap-4 mt-1" onSubmit={registerHandler}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}

              <Input
                label="Surname (optional)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <Input
              label="Confirm Password"
              type="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="accent-[#C9B194] mt-0.5 shrink-0"
              />
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
              <span className="text-[12px] text-gray-500 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#C9B194] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#C9B194] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="mt-1 w-full bg-[#1a1a1a] hover:bg-[#C9B194] text-white font-medium py-3.5 rounded-xl text-[14px] transition-colors duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#C9B194] hover:text-[#9a7f5e] font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
