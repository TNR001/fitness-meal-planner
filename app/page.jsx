"use client";

import { useState } from "react";
import LocationFetcher from "@/components/LocationFetcher";
import InputForm from "@/components/InputForm";
import MealPlanDisplay from "@/components/MealPlanDisplay";

export default function HomePage() {
  const [coords, setCoords] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const handleMealPlan = (data) => {
    setMealPlan(data);
    localStorage.setItem("mealPlan", JSON.stringify(data));  // 🟢 Save to localStorage
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">FitMeals 🍽️</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Personalized meal suggestions from nearby restaurants and stores, tailored to your fitness goals.
      </p>
      <a href="/form" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Generate My Meal Plan
      </a>
    </main>
  );
}
