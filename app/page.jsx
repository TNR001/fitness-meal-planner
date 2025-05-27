import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 flex flex-col items-center px-4">
        {/* Hero Section */}
        <section className="max-w-2xl text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI-Powered Fitness Meal Planning
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Instantly get personalized meal plans from local restaurants and stores, tailored to your fitness goals. Powered by smart recommendations and seamless tracking.
          </p>
          <Link href="/meal-plans">
            <button className="px-8 py-4 bg-blue-600 text-white text-lg rounded-full shadow hover:bg-blue-700 transition">
              Generate My Meal Plan
            </button>
          </Link>
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
          <FeatureCard
            title="Snap & Track"
            description="Easily log meals with a photo or quick search."
            icon="📸"
          />
          <FeatureCard
            title="Personalized Goals"
            description="Custom plans for weight loss, muscle gain, or balanced nutrition."
            icon="🎯"
          />
          <FeatureCard
            title="Progress Insights"
            description="Visualize your journey with charts and daily summaries."
            icon="📊"
          />
        </section>

        {/* Social Proof / Testimonials */}
        <section className="max-w-2xl w-full mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">What users are saying</h2>
          <div className="space-y-4">
            <Testimonial
              name="Alex"
              text="I've lost 10 lbs and love how easy it is to plan my meals!"
            />
            <Testimonial
              name="Jordan"
              text="The meal suggestions are always spot on for my macros."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

// FeatureCard component
function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Testimonial component
function Testimonial({ name, text }) {
  return (
    <div className="bg-white border-l-4 border-blue-600 p-4 rounded shadow">
      <p className="italic text-gray-700 mb-2">"{text}"</p>
      <span className="text-gray-500 text-sm">— {name}</span>
    </div>
  );
}
