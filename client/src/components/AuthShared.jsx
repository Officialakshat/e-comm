import { useState } from "react";

export function Input({ label, type = "text", placeholder, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-gray-600 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center bg-[#fdf9f5] border border-[#ede5da] rounded-xl px-4 gap-2 focus-within:border-[#C9B194] focus-within:ring-2 focus-within:ring-[#C9B19425] transition-all">
        {icon && <span className="text-[#C9B194] shrink-0">{icon}</span>}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none border-none py-3 text-[14px] text-gray-800 placeholder-[#c0b0a0]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

export function SocialBtn({ children }) {
  return (
    <button className="flex-1 flex items-center justify-center gap-2 border border-[#ede5da] hover:border-[#C9B194] hover:bg-[#fdf9f5] rounded-xl py-2.5 text-[13px] text-gray-600 font-medium transition-all duration-200">
      {children}
    </button>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-[#ede5da]" />
      <span className="text-[11px] text-gray-400 uppercase tracking-widest">
        or
      </span>
      <div className="flex-1 h-px bg-[#ede5da]" />
    </div>
  );
}
