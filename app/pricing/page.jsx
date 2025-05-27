import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 px-4 flex flex-col items-center">
        {/* Header */}
        <section className="max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Choose the plan that fits your fitness journey. No hidden fees, cancel anytime.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-16">
          <PricingCard
            title="Free"
            price="0"
            period="/month"
            features={[
              "Basic meal plans",
              "Access to community",
              "Track 1 goal",
            ]}
            cta="Get Started"
            href="/signup"
            highlight={false}
          />
          <PricingCard
            title="Pro"
            price="9"
            period="/month"
            features={[
              "Personalized meal plans",
              "Unlimited goals",
              "Workout recommendations",
              "Progress tracking",
              "Priority support",
            ]}
            cta="Start 7-day Free Trial"
            href="/signup"
            highlight={true}
          />
          <PricingCard
            title="Premium"
            price="19"
            period="/month"
            features={[
              "All Pro features",
              "1-on-1 nutrition coaching",
              "Custom recipes",
              "Early access to new features",
            ]}
            cta="Upgrade Now"
            href="/signup"
            highlight={false}
          />
        </section>
      </main>
    </div>
  );
}

// PricingCard component
function PricingCard({ title, price, period, features, cta, href, highlight }) {
  return (
    <div
      className={`flex flex-col p-8 text-center bg-white rounded-lg border shadow transition ${
        highlight
          ? "border-blue-600 shadow-lg scale-105 z-10"
          : "border-gray-200"
      }`}
    >
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <div className="flex justify-center items-baseline mb-6">
        <span className="text-5xl font-extrabold">${price}</span>
        <span className="text-gray-500 ml-2">{period}</span>
      </div>
      <ul className="mb-8 space-y-3 text-left">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href}>
        <button
          className={`w-full py-3 rounded font-semibold transition ${
            highlight
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cta}
        </button>
      </Link>
    </div>
  );
}
