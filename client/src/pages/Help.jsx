// pages/Help.jsx
import { useState } from "react";

const categories = [
  { icon: "📦", label: "Orders" },
  { icon: "🚚", label: "Delivery" },
  { icon: "↩️", label: "Returns" },
  { icon: "💳", label: "Payments" },
  { icon: "👤", label: "Account" },
  { icon: "🛡️", label: "Security" },
];

const faqs = [
  {
    cat: "Orders",
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive an email with a tracking link. You can also visit My Orders in your account dashboard and click 'Track' next to any active order.",
  },
  {
    cat: "Orders",
    q: "Can I cancel or modify my order?",
    a: "You can cancel or modify your order within 30 minutes of placing it. After that, the order enters processing and changes may not be possible. Contact our support team immediately if you need help.",
  },
  {
    cat: "Delivery",
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–5 business days. Express delivery (available at checkout) takes 1–2 business days. Remote areas may take up to 7 business days.",
  },
  {
    cat: "Delivery",
    q: "Is delivery free?",
    a: "Yes — delivery is free on all orders above ₹499. Orders below ₹499 have a flat ₹49 delivery fee.",
  },
  {
    cat: "Returns",
    q: "What is the return policy?",
    a: "We offer a 30-day hassle-free return policy. Items must be unused, in original packaging, and with all tags attached. Perishable items and personalised products are not eligible for return.",
  },
  {
    cat: "Returns",
    q: "How do I initiate a return?",
    a: "Go to My Orders in your account, select the item, and click 'Return Item'. Choose a reason and schedule a pickup. Refunds are processed within 5–7 business days after we receive the item.",
  },
  {
    cat: "Payments",
    q: "What payment methods are accepted?",
    a: "We accept UPI, credit/debit cards (Visa, Mastercard, RuPay), net banking, wallets (Paytm, PhonePe), and Cash on Delivery for eligible orders.",
  },
  {
    cat: "Payments",
    q: "When will I get my refund?",
    a: "Refunds are credited back to your original payment method within 5–7 business days. UPI and wallet refunds are usually faster (1–3 days). You'll receive an email once the refund is initiated.",
  },
  {
    cat: "Account",
    q: "How do I reset my password?",
    a: "Click 'Forgot password?' on the login page and enter your registered email. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it.",
  },
  {
    cat: "Account",
    q: "How do I delete my account?",
    a: "Go to Account Settings → Privacy → Delete Account. This permanently removes your data. Active orders must be completed or cancelled first. This action cannot be undone.",
  },
  {
    cat: "Security",
    q: "Is my payment information safe?",
    a: "Yes. We never store your full card details. All payments are processed by PCI-DSS compliant gateways (Razorpay). Your data is encrypted with SSL/TLS at all times.",
  },
  {
    cat: "Security",
    q: "I noticed a suspicious login — what should I do?",
    a: "Change your password immediately from Account Settings. Enable two-factor authentication if available. Contact our security team at security@urbanmart.in and we'll investigate right away.",
  },
];

export default function Help() {
  const [search, setSearch] = useState("");
  const [activecat, setActiveCat] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const filtered = faqs.filter((f) => {
    const matchCat = activecat === "All" || f.cat === activecat;
    const matchSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdf9f5]">
      {/* Hero + Search */}
      <div className="bg-[#C9B194] px-5 sm:px-8 py-14 text-center">
        <span className="inline-block text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-3">
          Support
        </span>
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          How can we help?
        </h1>
        <p className="text-sm  mb-7">
          Search our knowledge base or browse topics below.
        </p>

        {/* Search bar */}
        <div className="max-w-lg mx-auto flex items-center bg-white rounded-full overflow-hidden border border-[#ede5da] focus-within:ring-2 focus-within:ring-[#C9B19440] transition-all">
          <svg
            className="ml-4 shrink-0 text-gray-400"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search for answers…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenFaq(null);
            }}
            className="flex-1 bg-transparent outline-none border-none px-3 py-3 text-[13.5px] text-gray-800 placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mr-3 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["All", ...categories.map((c) => c.label)].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setOpenFaq(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-medium border transition-all duration-200 ${
                activecat === cat
                  ? "bg-[#C9B194] text-white border-[#C9B194]"
                  : "bg-white text-gray-600 border-[#ede5da] hover:border-[#C9B194] hover:text-[#C9B194]"
              }`}
            >
              {cat !== "All" && (
                <span>{categories.find((c) => c.label === cat)?.icon}</span>
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-[12px] text-gray-400 mb-4 text-center">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            {search}"
          </p>
        )}

        {/* FAQ Accordion */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                  openFaq === i ? "border-[#C9B194]" : "border-[#ede5da]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#fdf0e2] text-[#C9B194] shrink-0 uppercase tracking-wider">
                      {faq.cat}
                    </span>
                    <span className="text-[13.5px] font-medium text-gray-800 truncate">
                      {faq.q}
                    </span>
                  </div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9B194"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-5 pt-3 text-[13px] text-gray-600 leading-relaxed border-t border-[#f5ede0]">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14">
            <div className="w-14 h-14 bg-[#fdf0e2] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9B194"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-gray-700 mb-1">
              No results found
            </p>
            <p className="text-[12px] text-gray-400">
              Try a different keyword or browse by category above.
            </p>
          </div>
        )}

        {/* Contact options */}
        <div className="mt-12">
          <p className="text-center text-[13px] text-gray-500 mb-5">
            Still need help? Reach out to us.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9B194"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
                label: "Email Support",
                sub: "Reply within 24 hours",
                action: "support@urbanmart.in",
                href: "mailto:support@urbanmart.in",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9B194"
                    strokeWidth="1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z" />
                  </svg>
                ),
                label: "Phone Support",
                sub: "Mon–Sat, 9am–7pm",
                action: "+91 98765 43210",
                href: "tel:+919876543210",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9B194"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
                label: "Live Chat",
                sub: "Available 24/7",
                action: "Start Chat",
                href: "#",
              },
            ].map(({ icon, label, sub, action, href }) => (
              <a
                key={label}
                href={href}
                className="flex flex-col items-center gap-2.5 bg-white border border-[#ede5da] hover:border-[#C9B194] rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 bg-[#fdf0e2] rounded-full flex items-center justify-center group-hover:bg-[#faebd7] transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">
                    {label}
                  </p>
                  <p className="text-[11px] text-gray-400">{sub}</p>
                </div>
                <span className="text-[12px] text-[#C9B194] font-medium">
                  {action}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
