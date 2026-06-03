import "./Hero.css";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-linear-to-br from-[#fdf9f5] via-[#f5ede0] to-[#ede0cc] px-5 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
      {/* ── Decorative orbs ── */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-125 h-125 rounded-full bg-[radial-gradient(circle,#C9B19428_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/3 -bottom-20 w-85 h-85 rounded-full bg-[radial-gradient(circle,#e8d5bb1a_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-14 top-1/3 w-55 h-55 rounded-full bg-[radial-gradient(circle,#C9B19415_0%,transparent_70%)]" />

      {/* ── Inner grid ── */}
      <div className="relative z-10 w-full max-w-290 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8ddd0] rounded-full px-4 py-2 text-[11px] font-medium text-[#9a7f5e] uppercase tracking-widest mb-7 animate-[fadeUp_0.6s_ease_both]">
            <span className="w-1.75 h-1.75 rounded-full bg-[#C9B194] animate-[pulseDot_2s_ease-in-out_infinite]" />
            New Season Collection 2025
          </div>

          {/* Heading text */}
          <div className="mb-6 animate-[fadeUp_0.6s_ease_0.15s_both]">
            <h1
              className="text-[clamp(42px,5.5vw,70px)] font-bold text-gray-900 leading-[1.05] m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Discover
            </h1>

            {/* Animated word */}
            <span
              className="block text-[clamp(42px,5.5vw,70px)] font-bold text-[#C9B194] leading-[1.15] overflow-hidden relative"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                height: "1.15em",
              }}
            >
              <span className="absolute inset-0 animate-[fade_9s_linear_infinite]">
                Elegance
              </span>

              <span className="absolute inset-0 animate-[fade_9s_linear_3s_infinite] opacity-0">
                Quality
              </span>

              <span className="absolute inset-0 animate-[fade_9s_linear_6s_infinite] opacity-0">
                Style
              </span>
            </span>

            <h1
              className="text-[clamp(42px,5.5vw,70px)] font-bold text-gray-900 leading-[1.05] m-0"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Redefined.
            </h1>
          </div>

          {/* Description */}
          <p className="text-[15.5px] text-gray-500 leading-[1.8] max-w-110 mb-9 animate-[fadeUp_0.6s_ease_0.3s_both]">
            Curated collections for the modern home. From premium décor to
            everyday essentials — everything you love, delivered straight to
            your door.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-11 justify-center lg:justify-start animate-[fadeUp_0.6s_ease_0.45s_both]">
            <button className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5">
              Shop Now
            </button>
            <button className="border-[1.5px] border-[#d0c0a8] hover:border-[#9a7f5e] hover:bg-[#fdf9f5] text-gray-900 rounded-full px-7 py-3.5 text-sm font-normal transition-all duration-200 hover:-translate-y-0.5">
              Browse Collections →
            </button>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-[fadeUp_0.6s_ease_0.6s_both]">
            {/* Free Delivery */}
            <div className="flex items-center gap-2.5 bg-white border border-[#ede5da] rounded-2xl px-4 py-3 shadow-[0_2px_12px_#0000000a]">
              <div className="w-8 h-8 rounded-[9px] bg-[#fdf0e2] flex items-center justify-center shrink-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                  Free Delivery
                </p>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Orders over ₹499
                </p>
              </div>
            </div>

            {/* Authentic */}
            <div className="flex items-center gap-2.5 bg-white border border-[#ede5da] rounded-2xl px-4 py-3 shadow-[0_2px_12px_#0000000a]">
              <div className="w-8 h-8 rounded-[9px] bg-[#f0f9f4] flex items-center justify-center shrink-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                  100% Authentic
                </p>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Verified products
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="flex items-center gap-2.5 bg-white border border-[#ede5da] rounded-2xl px-4 py-3 shadow-[0_2px_12px_#0000000a]">
              <div className="w-8 h-8 rounded-[9px] bg-[#fdf5f0] flex items-center justify-center shrink-0">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                  24/7 Support
                </p>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Always here for you
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ RIGHT — SVG ILLUSTRATION ═══════════ */}
        <div className="flex justify-center items-center order-1 lg:order-2 animate-[fadeRight_0.8s_ease_0.25s_both]">
          <div className="w-full max-w-75 sm:max-w-90 lg:max-w-115 animate-[float_5s_ease-in-out_infinite]">
            <svg
              viewBox="0 0 480 440"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Background rings */}
              <circle cx="240" cy="220" r="205" fill="#fdf0e2" opacity="0.55" />
              <circle cx="240" cy="220" r="168" fill="#faebd7" opacity="0.38" />

              {/* Bag body */}
              <rect
                x="105"
                y="160"
                width="270"
                height="210"
                rx="22"
                fill="#fff"
                stroke="#e8d5bb"
                strokeWidth="1.5"
              />
              <rect
                x="105"
                y="160"
                width="270"
                height="210"
                rx="22"
                fill="url(#bagGrad)"
              />

              {/* Handles */}
              <path
                d="M170 160 C170 112 310 112 310 160"
                fill="none"
                stroke="#C9B194"
                strokeWidth="9"
                strokeLinecap="round"
              />

              {/* Brand label */}
              <rect
                x="148"
                y="210"
                width="184"
                height="54"
                rx="12"
                fill="#C9B19418"
              />
              <text
                x="240"
                y="243"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="17"
                fontWeight="700"
                fill="#9a7f5e"
                letterSpacing="1.5"
              >
                UrbanMart
              </text>

              {/* Decoration lines */}
              <line
                x1="132"
                y1="295"
                x2="348"
                y2="295"
                stroke="#ede5da"
                strokeWidth="1"
              />
              <line
                x1="132"
                y1="318"
                x2="290"
                y2="318"
                stroke="#ede5da"
                strokeWidth="1"
              />
              <line
                x1="132"
                y1="341"
                x2="240"
                y2="341"
                stroke="#ede5da"
                strokeWidth="0.8"
                opacity="0.6"
              />

              {/* Floating card 1 — top left */}
              <g transform="translate(44, 74)">
                <rect
                  width="80"
                  height="80"
                  rx="16"
                  fill="#fff"
                  stroke="#ede5da"
                  strokeWidth="1"
                />
                <rect
                  x="10"
                  y="10"
                  width="60"
                  height="36"
                  rx="8"
                  fill="#fdf0e2"
                />
                <ellipse cx="40" cy="22" rx="14" ry="9" fill="#e8d5bb" />
                <rect
                  x="37"
                  y="27"
                  width="6"
                  height="11"
                  rx="2"
                  fill="#C9B194"
                  opacity="0.7"
                />
                <rect
                  x="12"
                  y="53"
                  width="38"
                  height="6"
                  rx="3"
                  fill="#e8d5bb"
                />
                <rect
                  x="12"
                  y="64"
                  width="22"
                  height="5"
                  rx="2"
                  fill="#C9B194"
                  opacity="0.5"
                />
              </g>

              {/* Floating card 2 — top right */}
              <g transform="translate(352, 52)">
                <rect
                  width="86"
                  height="86"
                  rx="16"
                  fill="#fff"
                  stroke="#ede5da"
                  strokeWidth="1"
                />
                <circle cx="43" cy="34" r="20" fill="#f5ede0" />
                <circle cx="43" cy="34" r="12" fill="#e8d5bb" />
                <rect
                  x="13"
                  y="60"
                  width="44"
                  height="7"
                  rx="3"
                  fill="#e8d5bb"
                />
                <rect
                  x="21"
                  y="71"
                  width="24"
                  height="5"
                  rx="2"
                  fill="#C9B194"
                  opacity="0.55"
                />
              </g>

              {/* Floating card 3 — bottom left */}
              <g transform="translate(30, 296)">
                <rect
                  width="72"
                  height="72"
                  rx="14"
                  fill="#fff"
                  stroke="#ede5da"
                  strokeWidth="1"
                />
                <rect
                  x="10"
                  y="10"
                  width="52"
                  height="30"
                  rx="6"
                  fill="#fdf5ec"
                />
                <rect
                  x="10"
                  y="46"
                  width="32"
                  height="6"
                  rx="3"
                  fill="#e8d5bb"
                />
                <rect
                  x="10"
                  y="57"
                  width="20"
                  height="5"
                  rx="2"
                  fill="#C9B194"
                  opacity="0.5"
                />
              </g>

              {/* Star rating pill */}
              <g transform="translate(108, 382)">
                <rect
                  width="114"
                  height="34"
                  rx="17"
                  fill="#fff"
                  stroke="#ede5da"
                  strokeWidth="1"
                />
                <text
                  x="13"
                  y="22"
                  fontSize="13"
                  fill="#C9B194"
                  fontFamily="sans-serif"
                >
                  ★★★★★
                </text>
                <text
                  x="86"
                  y="22"
                  fontSize="10"
                  fill="#9a7f5e"
                  fontFamily="sans-serif"
                >
                  4.9
                </text>
              </g>

              {/* Discount badge */}
              <g transform="translate(340, 300)">
                <circle cx="40" cy="40" r="40" fill="#C9B194" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <text
                  x="40"
                  y="35"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="#fff"
                  fontFamily="sans-serif"
                >
                  30%
                </text>
                <text
                  x="40"
                  y="51"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#fff"
                  opacity="0.9"
                  fontFamily="sans-serif"
                >
                  OFF
                </text>
              </g>

              {/* Free ship pill */}
              <g transform="translate(338, 146)">
                <rect
                  width="96"
                  height="36"
                  rx="18"
                  fill="#fff"
                  stroke="#ede5da"
                  strokeWidth="1"
                />
                <text
                  x="14"
                  y="23"
                  fontSize="11"
                  fontWeight="500"
                  fill="#9a7f5e"
                  fontFamily="sans-serif"
                >
                  🚚 Free Ship
                </text>
              </g>

              {/* Sparkle dots */}
              <circle cx="98" cy="188" r="4.5" fill="#C9B194" opacity="0.45" />
              <circle cx="396" cy="140" r="3.5" fill="#C9B194" opacity="0.38" />
              <circle cx="428" cy="300" r="5" fill="#e8d5bb" opacity="0.65" />
              <circle cx="52" cy="258" r="3.5" fill="#C9B194" opacity="0.32" />
              <circle cx="210" cy="58" r="4.5" fill="#e8d5bb" opacity="0.55" />
              <circle cx="360" cy="388" r="3" fill="#C9B194" opacity="0.4" />

              {/* <defs>
                <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fdf9f5" stopOpacity="0.3" />
                </linearGradient>
              </defs> */}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
