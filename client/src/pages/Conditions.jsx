// pages/Terms.jsx
import { useState } from "react";

const highlights = [
  {
    icon: "🛒",
    title: "Fair Shopping",
    desc: "Clear pricing, no hidden fees, and transparent checkout always.",
  },
  {
    icon: "↩️",
    title: "30-Day Returns",
    desc: "Hassle-free returns on eligible items within 30 days of delivery.",
  },
  {
    icon: "⚖️",
    title: "Governed by Law",
    desc: "These terms are governed by the laws of India under IT Act 2000.",
  },
];

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using UrbanMart's website, mobile application, or any related services, you confirm that you are at least 18 years of age and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of our platform immediately. These terms apply to all visitors, users, and others who access the service.`,
  },
  {
    title: "User Accounts",
    content: `To place orders or access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately at support@urbanmart.in if you suspect any unauthorised use. UrbanMart reserves the right to terminate accounts that violate these terms or are found to be fraudulent.`,
  },
  {
    title: "Product Listings & Pricing",
    content: `We make every effort to display product information, images, and pricing accurately. However, errors may occasionally occur. UrbanMart reserves the right to cancel or modify orders where pricing errors are identified before dispatch. Product images are for illustrative purposes — actual product colour and appearance may vary slightly due to photography or screen settings. Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.`,
  },
  {
    title: "Orders & Payment",
    content: `Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion. An order is confirmed only upon receipt of a confirmation email from us. Payment must be made in full at the time of checkout. We accept UPI, credit/debit cards, net banking, and wallets. In the event of payment failure, your order will not be processed and no charges will be applied.`,
  },
  {
    title: "Shipping & Delivery",
    content: `Delivery timelines are estimates and not guaranteed. UrbanMart is not liable for delays caused by courier partners, natural events, or circumstances beyond our control. Risk of loss and title for items pass to you upon delivery. If an order is returned to us due to an incorrect address or failed delivery attempts, re-shipping charges may apply. Free delivery is available on orders above ₹499.`,
  },
  {
    title: "Returns, Refunds & Cancellations",
    content: `You may return eligible items within 30 days of delivery, provided they are unused, in original packaging, and accompanied by all tags. Non-returnable items include perishables, personalised products, and items marked as final sale. Refunds are processed within 5–7 business days after we receive and inspect the returned item. Orders may be cancelled within 30 minutes of placement. After this window, cancellation cannot be guaranteed as the order may be in processing.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on the UrbanMart platform — including logos, text, graphics, product images, and software — is the intellectual property of UrbanMart or its licensors and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission. You are granted a limited, non-exclusive licence to access and use the platform for personal, non-commercial purposes only.`,
  },
  {
    title: "Prohibited Conduct",
    content: `You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, or impair the service. Prohibited activities include attempting to gain unauthorised access to any part of our system, posting false or misleading reviews, scraping or harvesting data, using bots or automated tools, impersonating another user or UrbanMart, or engaging in any fraudulent transactions. Violations may result in immediate account termination and legal action.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, UrbanMart shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use the platform. Our total liability in any matter arising from these terms shall not exceed the amount you paid for the specific order in dispute. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses or other harmful components.`,
  },
  {
    title: "Governing Law & Disputes",
    content: `These Terms and Conditions are governed by and construed in accordance with the laws of India, including the Information Technology Act, 2000 and the Consumer Protection Act, 2019. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Chandigarh, India. We encourage you to contact us first to resolve any dispute amicably before initiating legal proceedings.`,
  },
  {
    title: "Modifications to Terms",
    content: `UrbanMart reserves the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the platform after any changes constitutes your acceptance of the revised terms. We recommend reviewing this page periodically to stay informed of any updates.`,
  },
];

export default function Conditions() {
  const [active, setActive] = useState(null);
  const [agreed, setAgreed] = useState(false);

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
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            Please read these terms carefully before using UrbanMart. By using
            our platform, you agree to be bound by these conditions.
          </p>
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            <span className="text-[11px] text-gray-400">
              Last updated: January 2025
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[11px] text-gray-400">Version 2.1</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <a
              href="/privacy"
              className="text-[11px] text-[#C9B194] hover:underline"
            >
              View Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {highlights.map(({ icon, title, desc }) => (
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

        {/* Expand / collapse all */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] text-gray-400">
            {sections.length} sections
          </p>
          <button
            onClick={() => setActive(active !== null ? null : 0)}
            className="text-[12px] text-[#C9B194] hover:text-[#9a7f5e] font-medium transition-colors"
          >
            {active !== null ? "Collapse all" : "Expand first"}
          </button>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {sections.map((s, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
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
                className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-5 pb-5 pt-3 text-[13.5px] text-gray-600 leading-relaxed border-t border-[#f5ede0]">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement checkbox */}
        <div
          className={`mt-8 rounded-2xl border p-5 transition-all duration-300 ${agreed ? "bg-green-50 border-green-200" : "bg-white border-[#ede5da]"}`}
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed((v) => !v)}
              className="mt-0.5 accent-[#C9B194] w-4 h-4 shrink-0"
            />
            <span className="text-[13px] text-gray-600 leading-relaxed">
              I have read and agree to UrbanMart's Terms and Conditions and{" "}
              <a href="/privacy" className="text-[#C9B194] hover:underline">
                Privacy Policy
              </a>
              . I confirm I am at least 18 years of age.
            </span>
          </label>
          {agreed && (
            <p className="text-[11px] text-green-600 font-medium mt-3 flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You've agreed to our terms. Welcome to UrbanMart!
            </p>
          )}
        </div>

        {/* Contact box */}
        <div className="mt-6 bg-white border border-[#ede5da] rounded-2xl p-6 text-center">
          <p className="text-[14px] font-medium text-gray-800 mb-1">
            Have a legal question?
          </p>
          <p className="text-[13px] text-gray-500 mb-4">
            Our legal team is available to clarify any part of these terms.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:legal@urbanmart.in"
              className="inline-block bg-[#1a1a1a] hover:bg-[#C9B194] text-white text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
            >
              Email Legal Team
            </a>
            <a
              href="/help"
              className="inline-block border border-[#ede5da] hover:border-[#C9B194] text-gray-600 hover:text-[#C9B194] text-[13px] font-medium px-6 py-2.5 rounded-xl transition-colors duration-200"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
