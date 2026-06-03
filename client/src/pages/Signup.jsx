import { useNavigate } from "react-router-dom";
import { Input, SocialBtn, Divider } from "../components/AuthShared";

export default function SignUp() {
  const navigate = useNavigate();

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

          <form
            className="flex flex-col gap-4 mt-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
            />

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#C9B194] mt-0.5 shrink-0"
              />
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
