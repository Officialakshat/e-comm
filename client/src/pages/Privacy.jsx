// pages/Privacy.jsx
import { useState } from "react";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly — such as your name, email address, phone number, shipping address, and payment details when you create an account or place an order. We also automatically collect certain data when you use our site, including your IP address, browser type, pages visited, and device information to improve your experience.`,
  },
  {
    title: "How We Use Your Information",
    content: `Your information is used to process orders and payments, send order confirmations and delivery updates, personalise your shopping experience, respond to customer support queries, send promotional offers (only if you opt in), and improve our website and services. We never sell your personal data to third parties.`,
  },
  {
    title: "Sharing Your Information",
    content: `We share your data only with trusted partners needed to operate our services — payment processors (Razorpay, PayPal), delivery partners, and cloud hosting providers. All third parties are contractually bound to keep your data secure and use it only for the services they provide to us.`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use essential cookies to keep your cart and session active, and optional analytics cookies (Google Analytics) to understand how visitors use our site. You can manage or disable non-essential cookies at any time via your browser settings. Disabling cookies may affect some features like saved cart items.`,
  },
  {
    title: "Data Security",
    content: `All data transmitted between your browser and our servers is encrypted using TLS/SSL. Payment information is processed by PCI-DSS compliant providers — we never store your full card number. We conduct regular security audits and restrict access to personal data to authorised team members only.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal data at any time. You can also request a copy of data we hold about you, withdraw consent for marketing emails, or ask us to restrict processing of your information. To exercise any of these rights, email us at privacy@urbanmart.in.`,
  },
  {
    title: "Retention Policy",
    content: `We retain your personal data only as long as necessary to fulfil the purposes described in this policy or as required by law. Order records are kept for 7 years for accounting purposes. You can request deletion of your account and associated data at any time.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will notify you via email or a prominent notice on our website. Continued use of UrbanMart after changes are posted constitutes your acceptance of the updated policy.`,
  },
];

export default function Privacy() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-[#fdf9f5]">
      {/* Hero */}
      <div className="bg-white border-b border-[#ede5da] px-5 sm:px-8 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-medium tracking-widest text-[#C9B194] uppercase mb-3">
            Legal
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            We value your trust. This policy explains what data we collect, how
            we use it, and the choices you have.
          </p>
          <p className="text-[11px] text-gray-400 mt-4">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        {/* Quick summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: "🔒",
              title: "No Data Selling",
              desc: "We never sell your personal information to third parties.",
            },
            {
              icon: "🛡️",
              title: "SSL Encrypted",
              desc: "All data is encrypted in transit using TLS/SSL.",
            },
            {
              icon: "✉️",
              title: "Opt-out Anytime",
              desc: "Unsubscribe from marketing emails with one click.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-[#ede5da] p-4 text-center"
            >
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-[13px] font-semibold text-gray-800 mb-1">
                {title}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {sections.map((s, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                active === i ? "border-[#C9B194]" : "border-[#ede5da]"
              }`}
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#fdf0e2] text-[#C9B194] text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-medium text-gray-800">
                    {s.title}
                  </span>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9B194"
                  strokeWidth="2"
                  className={`shrink-0 transition-transform duration-300 ${active === i ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ${active === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <p className="px-5 pb-5 text-[13.5px] text-gray-600 leading-relaxed border-t border-[#f5ede0] pt-3">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-10 bg-white border border-[#ede5da] rounded-2xl p-6 text-center">
          <p className="text-[14px] font-medium text-gray-800 mb-1">
            Questions about your privacy?
          </p>
          <p className="text-[13px] text-gray-500 mb-4">
            Our data protection team is happy to help.
          </p>
          <a
            href="mailto:privacy@urbanmart.in"
            className="inline-block bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </div>
  );
}
